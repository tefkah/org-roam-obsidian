import { readFile } from 'fs/promises'
import { join } from 'path'
import { collectLinks } from '../collect-org-roam-links'
import { getDataFromFile } from '../getDataFromFile'

describe('links', () => {
  it('should read', async () => {
    const data = await collectLinks(join(__dirname, 'links'))
    expect(data).toEqual({})
  })

  it('should find id', async () => {
    const file = await readFile(join(__dirname, 'links', 'one.org'), 'utf8')

    const data = await getDataFromFile(file)
    const { id } = data
    console.log(data)
    expect(id).toBeDefined()
  })
})
