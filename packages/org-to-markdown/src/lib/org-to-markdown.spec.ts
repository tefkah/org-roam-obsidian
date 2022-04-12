import { orgToMarkdown } from './org-to-markdown'
describe('run it', () => {
  it('shoud work', async () => {
    await orgToMarkdown('/Users/thomas/Notes', '/Users/thomas/Notes-2/')
  })
})
