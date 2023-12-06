import { tsConfig } from '@jill64/eslint-config-ts'

/** @type {import('@jill64/eslint-config-ts').FlatConfig[]} */
export default [
  ...tsConfig(),
  {
    ignores: ['demo', 'tests']
  },
  {
    languageOptions: {
      globals: {
        process: 'readonly'
      }
    }
  }
]
