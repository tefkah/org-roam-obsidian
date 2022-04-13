import { Blockquote } from 'mdast'
import {
  ExampleBlock,
  ExportBlock,
  QuoteBlock,
  SpecialBlock,
  VerseBlock,
} from 'uniorg'
import { select } from 'unist-util-select'
import { all } from '../all'
import { Handle, J } from '../types'
import { wrap } from '../util/wrap'

export const block: Handle = (
  j: J,
  node: QuoteBlock | ExampleBlock | SpecialBlock | VerseBlock
): Blockquote => {
  const contents = all(j, node)
  const par = contents?.[0]
  let val = ''
  switch (node.type) {
    case 'example-block':
      val = 'example'
      break
    case 'special-block': {
      val = node.blockType
      break
    }
    case 'quote-block': {
      val = 'quote'
      break
    }
    case 'verse-block': {
      val = 'verse'
      break
    }
    default:
      val = 'info'
  }

  const ad = { type: 'rawText', value: `[!${val}]\n` }
  // @ts-expect-error shush
  par?.children?.unshift(ad)
  return j(
    node,
    'blockquote',
    // @ts-expect-error shus
    contents.length ? contents : [ad]
  ) as Blockquote
}
