import { init } from '@jill64/sentry-sveltekit-cloudflare/client'

const onError = init(
  'https://78acd899ac0de8c7c0cc5d39cae36bfb@o4505814639312896.ingest.sentry.io/4506330237435904'
)

export const handleError = onError()
