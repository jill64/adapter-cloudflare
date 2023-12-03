// https://developers.cloudflare.com/workers/runtime-apis/nodejs/

export const compat_modules = [
  'async_hooks',
  'buffer',
  'crypto',
  'diagnostics_channel',
  'events',
  'path',
  'process',
  'stream',
  'string_decoder',
  'util'
] as const

export const compat_sub_modules = [
  'stream/consumers',
  'stream/promises'
] as const

export const compat_all_modules = [
  ...compat_modules,
  ...compat_sub_modules
] as const
