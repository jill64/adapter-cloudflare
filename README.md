<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/adapter-cloudflare


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/@jill64/adapter-cloudflare"><img src="https://img.shields.io/npm/v/@jill64/adapter-cloudflare" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/adapter-cloudflare"><img src="https://img.shields.io/npm/l/@jill64/adapter-cloudflare" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/adapter-cloudflare"><img src="https://img.shields.io/npm/dm/@jill64/adapter-cloudflare" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/adapter-cloudflare"><img src="https://img.shields.io/bundlephobia/min/@jill64/adapter-cloudflare" alt="npm-min-size" /></a> <a href="https://github.com/jill64/adapter-cloudflare/actions/workflows/ci.yml"><img src="https://github.com/jill64/adapter-cloudflare/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>
<!----- END GHOST DOCS BADGES ----->


🔌 SvelteKit Adapter for Cloudflare Pages with nodejs_compat

<!----- END GHOST DOCS HEADER ----->

This adapter is based on [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) and allows some node modules to be used with Cloudflare Pages.

## Installation

```sh
npm i -D @jill64/adapter-cloudflare
```

## Usage

1. Add the adapter to your project.
   Adapter options are compatible with [@sveltejs/adapter-cloudflare](https://github.com/sveltejs/kit/blob/master/packages/adapter-cloudflare/index.d.ts).

```js
// svelte.config.js
import adapter from '@jill64/adapter-cloudflare'

export default {
  kit: {
    adapter: adapter({
      /* @sveltejs/adapter-cloudflare options */
      // routes: {
      //   // ...
      // }
    })
  }
}
```

If you need a node module that is not officially supported, add a polyfill with the following options based on [esbuild-plugin-polyfill-node](https://github.com/cyco130/esbuild-plugin-polyfill-node#esbuild-plugin-polyfill-node).

```js
// svelte.config.js
import adapter from '@jill64/adapter-cloudflare'

export default {
  kit: {
    adapter: adapter({
      // /* esbuild-plugin-polyfill-node options */
      // globals: {
      //   // ...
      // },
      // polyfills: {
      //   // ...
      // }
    })
  }
}
```

2. Enable Node.js compatibility in Cloudflare Pages.

   1. Go to Pages project page.
   2. Click the "Settings" => "Functions".
   3. Add `nodejs_compat` to the Compatibility flags.

3. Deploy your project.

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
