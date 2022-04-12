import { firstPhrasing } from 'orgast-util-first-phrasing'
import {
  GreaterElement,
  Element,
  GreaterElementType,
  Keyword,
  RecursiveObject,
  OrgData,
  Section,
} from 'uniorg'
import { toString } from 'orgast-util-to-string'
import { convert } from 'unist-util-is'
import { Handle, J } from '../types'
import similarity from 'similarity'

const isOrgData = convert<OrgData>('org-data')
const isSection = convert<Section>('section')
export const keyword: Handle = (
  j: J,
  node: Keyword,
  parent?: GreaterElement | Element | RecursiveObject
) => {
  const key = node.key.toLowerCase()
  switch (key) {
    case 'title': {
      j.frontMatter['title'] = node.value
      const firstPhrase =
        (j.ignoreTitleFirstHeading &&
          isOrgData(parent) &&
          firstPhrasing(parent)) ||
        null

      if (firstPhrase && isSection(firstPhrase)) {
        const title = toString(firstPhrase.children[0]) || ''
        if (similarity(title.toLowerCase(), node.value.toLowerCase()) > 0.75)
          return
      }
      return j(node, 'heading', { depth: 1 }, [
        { type: 'text', value: node.value },
      ])
    }
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
