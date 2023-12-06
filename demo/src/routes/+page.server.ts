import { Buffer } from 'node:buffer'
import path from 'path'

export const load = () => ({
  date: Buffer.from('Buffer Test').toString(),
  path: path.join('path', 'join', 'test')
})
