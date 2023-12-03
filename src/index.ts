import type {
  AdapterOptions,
  RoutesJSONSpec
} from '@sveltejs/adapter-cloudflare'
import { Adapter, Builder } from '@sveltejs/kit'
import { build } from 'esbuild'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'
import { resolve } from 'import-meta-resolve'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { compat_all_modules, compat_modules } from './compat-modules.js'
import { PolyfillConfig } from './types/PolyfillConfig.js'

export default (
  options: AdapterOptions & {
    polyfills?: PolyfillConfig
  } = {}
): Adapter => ({
  name: '@jill64/adapter-cloudflare',
  async adapt(builder) {
    const files = fileURLToPath(
      path.join(
        resolve('@sveltejs/adapter-cloudflare', import.meta.url),
        '../files'
      )
    )

    const dest = builder.getBuildDirectory('cloudflare')
    const tmp = builder.getBuildDirectory('cloudflare-tmp')

    builder.rimraf(dest)
    builder.rimraf(tmp)
    builder.mkdirp(tmp)

    // generate 404.html first which can then be overridden by prerendering, if the user defined such a page
    await builder.generateFallback(path.join(dest, '404.html'))

    const dest_dir = `${dest}${builder.config.kit.paths.base}`
    const written_files = builder.writeClient(dest_dir)
    builder.writePrerendered(dest_dir)

    const relativePath = path.posix.relative(tmp, builder.getServerDirectory())

    writeFileSync(
      `${tmp}/manifest.js`,
      `export const manifest = ${builder.generateManifest({
        relativePath
      })};\n\n` +
        `export const prerendered = new Set(${JSON.stringify(
          builder.prerendered.paths
        )});\n`
    )

    writeFileSync(
      `${dest}/_routes.json`,
      JSON.stringify(
        get_routes_json(builder, written_files, options.routes ?? {}),
        null,
        '\t'
      )
    )

    writeFileSync(`${dest}/_headers`, generate_headers(builder.getAppPath()), {
      flag: 'a'
    })

    builder.copy(`${files}/worker.js`, `${tmp}/_worker.js`, {
      replace: {
        SERVER: `${relativePath}/index.js`,
        MANIFEST: './manifest.js'
      }
    })

    const node_compats = compat_all_modules.map((x) => [x, `node:${x}`])
    const exclude_modules = Object.fromEntries(
      compat_modules.map((x) => [x, false])
    )

    const node_polyfill = polyfillNode({
      globals: {
        global: false,
        __dirname: false,
        __filename: false,
        navigator: false,
        ...exclude_modules,
        ...(options.polyfills?.globals ?? {})
      },
      polyfills: {
        _stream_duplex: false,
        _stream_passthrough: false,
        _stream_readable: false,
        _stream_transform: false,
        _stream_writable: false,
        assert: false,
        'assert/strict': false,
        child_process: false,
        cluster: false,
        console: false,
        constants: false,
        dgram: false,
        dns: false,
        domain: false,
        fs: false,
        'fs/promises': false,
        http: false,
        http2: false,
        https: false,
        module: false,
        net: false,
        os: false,
        perf_hooks: false,
        punycode: false,
        querystring: false,
        readline: false,
        repl: false,
        sys: false,
        timers: false,
        'timers/promises': false,
        tls: false,
        tty: false,
        url: false,
        v8: false,
        vm: false,
        wasi: false,
        worker_threads: false,
        zlib: false,
        ...exclude_modules,
        ...(options.polyfills?.polyfills ?? {})
      }
    })

    await build({
      platform: 'browser',
      conditions: ['worker', 'browser'],
      sourcemap: 'linked',
      target: 'es2022',
      entryPoints: [`${tmp}/_worker.js`],
      outfile: `${dest}/_worker.js`,
      allowOverwrite: true,
      format: 'esm',
      bundle: true,
      loader: {
        '.wasm': 'copy'
      },
      alias: Object.fromEntries(node_compats),
      external: ['cloudflare:*', ...node_compats.map((m) => m[1])],
      plugins: [node_polyfill]
    })
  }
})

const get_routes_json = (
  builder: Builder,
  assets: string[],
  { include = ['/*'], exclude = ['<all>'] }: AdapterOptions['routes']
): RoutesJSONSpec => {
  if (!Array.isArray(include) || !Array.isArray(exclude)) {
    throw new Error('routes.include and routes.exclude must be arrays')
  }

  if (include.length === 0) {
    throw new Error('routes.include must contain at least one route')
  }

  if (include.length > 100) {
    throw new Error('routes.include must contain 100 or fewer routes')
  }

  exclude = exclude
    .flatMap((rule) =>
      rule === '<all>' ? ['<build>', '<files>', '<prerendered>'] : rule
    )
    .flatMap((rule) => {
      if (rule === '<build>') {
        return `/${builder.getAppPath()}/*`
      }

      if (rule === '<files>') {
        return assets
          .filter(
            (file) =>
              !(
                file.startsWith(`${builder.config.kit.appDir}/`) ||
                file === '_headers' ||
                file === '_redirects'
              )
          )
          .map((file) => `/${file}`)
      }

      if (rule === '<prerendered>') {
        const prerendered = []
        for (const path of builder.prerendered.paths) {
          if (!builder.prerendered.redirects.has(path)) {
            prerendered.push(path)
          }
        }

        return prerendered
      }

      return rule
    })

  const excess = include.length + exclude.length - 100
  if (excess > 0) {
    const message = `Function includes/excludes exceeds _routes.json limits (see https://developers.cloudflare.com/pages/platform/functions/routing/#limits). Dropping ${excess} exclude rules — this will cause unnecessary function invocations.`
    builder.log.warn(message)

    exclude.length -= excess
  }

  return {
    version: 1,
    description: 'Generated by @jill64/adapter-cloudflare',
    include,
    exclude
  }
}

const generate_headers = (app_dir: string) =>
  `
# === START AUTOGENERATED SVELTE IMMUTABLE HEADERS ===
/${app_dir}/*
  X-Robots-Tag: noindex
	Cache-Control: no-cache
/${app_dir}/immutable/*
  ! Cache-Control
	Cache-Control: public, immutable, max-age=31536000
# === END AUTOGENERATED SVELTE IMMUTABLE HEADERS ===
`.trimEnd()
