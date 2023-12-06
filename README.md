<!----- BEGIN GHOST DOCS HEADER ----->

# adapter-cloudflare

[![npm-version](https://img.shields.io/npm/v/@jill64/adapter-cloudflare)](https://npmjs.com/package/@jill64/adapter-cloudflare) [![npm-license](https://img.shields.io/npm/l/@jill64/adapter-cloudflare)](https://npmjs.com/package/@jill64/adapter-cloudflare) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/adapter-cloudflare)](https://npmjs.com/package/@jill64/adapter-cloudflare) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/adapter-cloudflare)](https://npmjs.com/package/@jill64/adapter-cloudflare) [![ci.yml](https://github.com/jill64/adapter-cloudflare/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/adapter-cloudflare/actions/workflows/ci.yml)

🔌 SvelteKit Adapter for Cloudflare Pages with node_compat

<!----- END GHOST DOCS HEADER ----->

## Usage

```js
// svelte.config.js
import adapter from '@jill64/adapter-cloudflare'

export default {
  kit: {
    adapter: adapter({
      // /* @sveltejs/adapter-cloudflare options */
      // routes: {
      //   // ...
      // },
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
