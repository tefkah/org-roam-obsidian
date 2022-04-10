import { GreaterElement, GreaterElementType, Keyword } from 'uniorg'
import { Handle, J } from '../types'
import { toString } from 'orgast-util-to-string'
import { wrapText } from '../util/wrap-text'
import { front } from './front'
import { all } from '../all'
import { wrap } from '../util/wrap'

const keywordMetadataMap: Record<string, string> = {
  roam_refs: 'citekey',
  id: 'org-id',
}

export const keyword: Handle = (
  j: J,
  node: Keyword,
  parent?: GreaterElement
) => {
  const key = node.key.toLowerCase()
  switch (key) {
    case 'title':
      return j(node, 'heading', { depth: 1 }, [
        { type: 'text', value: node.value },
      ])
    case 'filetags': {
      j.frontMatter.push({
        key: 'tags',
        value: `\n  - ${node.value.split(':').join('\n  - ')}`,
      })
      return
    }
    default:
      if (j.ignoredKeywords.some((keyw) => keyw.toLowerCase() === key)) {
        return
      }
      j.frontMatter.push({
        key: j.keywordFrontMatterMap[key] || key,
        value: node.value,
      })
      break
  }
}
