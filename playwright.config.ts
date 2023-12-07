import {
  branchPreview,
  extendsConfig,
  vitePreview
} from '@jill64/playwright-config'

export default extendsConfig(
  branchPreview({
    provider: 'cloudflare',
    fallback: vitePreview
  })
)
