/* eslint-disable @typescript-eslint/no-empty-interface */
import { readFile } from 'fs/promises'
import path from 'path'

export interface ReadOrgFileProps {}

export const readOrgFile = async (file: string, props?: ReadOrgFileProps) => {
  try {
    const text = await readFile(file, { encoding: 'utf8' })
    return text
  } catch (e) {
    console.error(e)
    return ''
  }
}
