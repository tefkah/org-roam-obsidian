import { OrgData } from 'uniorg'
import { Node } from 'unist'
import { u } from 'unist-builder'
import { firstPhrasing } from './orgast-util-first-phrasing'

describe('orgast-util-first-phrasing', () => {
  const test = u('org-data', [
    u('drawer', 'some bullshit'),
    u('section', [u('headline', 'wow')]),
  ])
  it('should work', () => {
    // @ts-expect-error contents should not be empty
    expect(firstPhrasing(test)).toEqual(u('section', [u('headline', 'wow')]))
  })
})
