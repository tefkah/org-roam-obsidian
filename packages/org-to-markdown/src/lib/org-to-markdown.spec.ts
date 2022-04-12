import { orgToMarkdown } from './org-to-markdown'
describe('run it', () => {
  jest.setTimeout(20000)
  it('shoud work', async () => {
    await orgToMarkdown('/Users/thomas/Notes', '/Users/thomas/Notes-2/')
  })
})
