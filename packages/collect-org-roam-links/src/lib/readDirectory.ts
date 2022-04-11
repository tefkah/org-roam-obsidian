import { readFile } from 'fs/promises'
import readdirp from 'readdirp'

export const readDirectory = async (
  path: string
): Promise<{ path: string; file: string }[]> => {
  const files = await readdirp.promise(path, {
    type: 'files',
    fileFilter: ['!README.org', '*.org'],
  })

  const result = [] as { path: string; file: string }[]
  for (const entry of files) {
    const { path, fullPath } = entry

    const file = await readFile(fullPath, 'utf-8')
    result.push({ path, file })
  }
  return result
}
