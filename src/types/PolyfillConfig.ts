import { type PolyfillNodeOptions } from 'esbuild-plugin-polyfill-node'
import { compat_modules } from '../compat-modules.js'

type ModuleKeys = (typeof compat_modules)[number]

export type PolyfillConfig = {
  globals?: Omit<PolyfillNodeOptions['globals'], ModuleKeys>
  polyfills?: Omit<PolyfillNodeOptions['polyfills'], ModuleKeys>
}
