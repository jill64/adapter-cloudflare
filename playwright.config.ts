import { extendsConfig } from '@jill64/playwright-config'

const ref_name = process.env.GITHUB_REF_NAME?.replace(/\//g, '-')
  .replace('.', '-')
  .slice(0, 28)

export default extendsConfig({
  use: {
    baseURL:
      ref_name === 'main'
        ? 'https://adapter-cloudflare.pages.dev'
        : `https://${ref_name}.adapter-cloudflare.pages.dev`
  }
})
