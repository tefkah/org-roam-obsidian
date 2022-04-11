import { Paragraph as MdastParagraph } from 'mdast'
import { GreaterElement, GreaterElementType, Paragraph } from 'uniorg'
import { Handle, J } from '../types'
import { wrapText } from '../util/wrap-text'
import { toString } from 'orgast-util-to-string'
import { trimTrailingLines } from 'trim-trailing-lines'
import { all } from '../all'

export const paragraph: Handle = (j: J, node: Paragraph): MdastParagraph => {
  return j(node, 'paragraph', all(j, node)) as MdastParagraph
}
