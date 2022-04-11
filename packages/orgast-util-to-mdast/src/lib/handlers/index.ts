import { italic } from './italic'
import { all } from '../all'
import { wrapChildren } from '../util/wrap-children'
import { table } from './table'
import { srcBlock } from './srcBlock'
import { keyword } from './keyword'
import { headline } from './headline'
import { bold } from './bold'
import { code } from './code'
import { strikeThrough } from './strikeThrough'
import { underline } from './underline'
import { superscript } from './superscript'
import { subscript } from './subscript'
import { paragraph } from './paragraph'
import { latexFragment } from './latexFragment'
import { latexEnvironment } from './latexEnvironment'
import { text } from './text'
import { list } from './list'
import { listItem } from './listItem'
import { comment } from './comments'
import { link } from './link'
import { citation } from './citation'
import { tableCell } from './tableCell'
import { tableRow } from './tableRow'

export const handlers = {
  // 'org-data': orgData,
  // section,
  // 'property-drawer': propertyDrawer,
  drawer: ignore,
  'property-drawer': ignore,
  'plain-list': list,
  'list-item': listItem,
  // 'quote-block': quoteBlock,
  // 'verse-block': verseBlock,
  // 'center-block': centerBlock,
  // 'special-block': specialBlock,
  // 'footnote-definition': footnoteDefinition,
  table,
  'table-row': tableRow,
  'table-cell': tableCell,
  properties: ignore,
  headline,
  // planning,
  // 'node-property': nodeProperty,
  // 'listItem-tag': listItemTag,
  // 'comment-block': commentBlock,
  'src-block': srcBlock,
  // 'example-block': exampleBlock,
  // 'export-block': exportBlock,
  keyword,
  // 'table-row': tableRow,
  comment,
  // 'fixed-width': fixedWidth,
  // clock,
  'latex-environment': latexEnvironment,
  // 'horizontal-rule': horizontalRule,
  // 'diary-sexp': diarySexp,

  paragraph,
  link,
  bold,
  italic,
  code,
  verbatim: code,
  'strike-through': strikeThrough,
  underline,
  superscript,
  subscript,
  text,
  // timestamp,
  // 'footnote-reference': footnoteReference,
  'latex-fragment': latexFragment,
  // entity,
  // 'table-cell': tableCell,
  citation,
  // 'citation-element': citationElement,
}

function ignore() {
  //
}
