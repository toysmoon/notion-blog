import fs from 'fs'
import { promisify } from 'util'

const isProd = process.env.NODE_ENV === 'production'
export const readFile = isProd ? promisify(fs.readFile) : () => null
export const writeFile = isProd ? promisify(fs.writeFile) : () => null
