import { lstat, readdir, readFile } from 'fs/promises'
import { resolve } from 'path'
import { unified } from 'unified'
import { getDataFromFile, OrgFileData } from './getDataFromFile'
import { readOrgFile } from './readOrgFile'
import readdirp from 'readdirp'
import { readDirectory } from './readDirectory'

export interface FilesData {
  [file: string]: OrgFileData
}
export async function collectLinks(
  dir: string | { path: string; file: string }[],
  by?: 'id' | 'title' | 'cite'
) {
  const isRead = Array.isArray(dir)

  const files = isRead ? dir : await readDirectory(dir)

  const fileData = {} as FilesData
  for (const entry of files) {
    const { file, path } = entry

    const data = await getDataFromFile(file)

    fileData[data.id] = { ...data, path }
  }

  Object.entries(fileData).forEach((entry) => {
    const [id, obj] = entry

    const links = [...(obj.forwardLinks ?? []), ...(obj.citations ?? [])]
    links.forEach(
      (link) =>
        fileData[link] &&
        (fileData[link].backLinks = [...(fileData[link].backLinks ?? []), id])
    )
  })

  switch (by) {
    case 'title': {
      return Object.values(fileData).reduce((acc, curr) => {
        acc[curr.title] = curr
        return acc
      }, {} as FilesData)
    }
    case 'cite':
      return Object.values(fileData).reduce((acc, curr) => {
        if (!curr.citation) return acc
        acc[curr.citation] = curr
        return acc
      }, {} as FilesData)
    case 'id':
    default:
      return fileData
  }
}
