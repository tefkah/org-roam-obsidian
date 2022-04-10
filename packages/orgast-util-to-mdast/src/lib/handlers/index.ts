import { italic } from './italic'
import { all } from '../all'
import { command } from './command'
import { root } from './root'
import { article } from './article'
import { body } from './body'
import { text } from './text'
import { front } from './front'
import { wrapChildren } from '../util/wrap-children'
import { environment } from './environment'
import { sec } from './sec'
import { listItem } from './listItem'
import { list } from './list'
import { tableWrap } from './tableWrap'
import { table } from './table'
import { tr } from './tr'
import { td } from './td'
import { refList } from './refList'
import { xref } from './xref'
import { fig } from './fig'
import { graphic } from './graphic'
import { extLink } from './extLink'
import { p } from './p'
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

export const handlers = {
  // 'org-data': orgData,
  // section,
  // 'property-drawer': propertyDrawer,
  // drawer,
  // list,
  // 'list-item': listItem,
  // 'quote-block': quoteBlock,
  // 'verse-block': verseBlock,
  // 'center-block': centerBlock,
  // 'special-block': specialBlock,
  // 'footnote-definition': footnoteDefinition,
  // table,
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
  // comment,
  // 'fixed-width': fixedWidth,
  // clock,
  'latex-environment': latexEnvironment,
  // 'horizontal-rule': horizontalRule,
  // 'diary-sexp': diarySexp,
  paragraph,
  // link,
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
  // citation,
  // 'citation-element': citationElement,
}

function ignore() {
  //
}
