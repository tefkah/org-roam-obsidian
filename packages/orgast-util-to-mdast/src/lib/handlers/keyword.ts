import { GreaterElement, GreaterElementType, Keyword } from 'uniorg'
import { Handle, J } from '../types'

export const keyword: Handle = (j: J, node: Keyword) => {
  const key = node.key.toLowerCase()
  switch (key) {
    case 'title':
      j.frontMatter.push({
        key: 'title',
        value: node.value,
      })
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
