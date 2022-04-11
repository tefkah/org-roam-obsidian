import { Blockquote } from 'mdast'
import { QuoteBlock } from 'uniorg'
import { all } from '../all'
import { Handle, J } from '../types'

export const quoteBlock: Handle = (j: J, node: QuoteBlock): Blockquote => {
  return j(node, 'blockquote', all(j, node)) as Blockquote
}
