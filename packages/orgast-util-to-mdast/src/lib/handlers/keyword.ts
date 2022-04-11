import { GreaterElement, GreaterElementType, Keyword } from 'uniorg'
import { Handle, J } from '../types'

export const keyword: Handle = (j: J, node: Keyword) => {
  const key = node.key.toLowerCase()
  switch (key) {
    case 'title':
      j.frontMatter['title'] = node.value
      return j(node, 'heading', { depth: 1 }, [
        { type: 'text', value: node.value },
      ])
    case 'filetags': {
      j.frontMatter['tags'] = node.value.split(':').filter((t) => t)
      return
    }
    default:
      if (j.ignoredKeywords.some((keyw) => keyw.toLowerCase() === key)) {
        return
      }
      j.frontMatter[j.keywordFrontMatterMap[key] || key] = node.value

      break
  }
}
