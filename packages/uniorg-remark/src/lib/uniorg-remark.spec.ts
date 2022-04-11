import { Node } from 'unist'
import uniorgRemark from './uniorg-remark'

describe('uniorg-remark', () => {
  it('should work', () => {
    expect(uniorgRemark({ type: 'root', children: [] } as Node)).toBeDefined()
  })
})
