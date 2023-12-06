import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'

export const load = () => ({
  date: Buffer.from('Buffer Test').toString(),
  eq: crypto.timingSafeEqual(Buffer.from('123'), Buffer.from('123'))
})
