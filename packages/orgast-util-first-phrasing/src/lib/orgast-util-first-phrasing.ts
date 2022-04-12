import {
  CenterBlock,
  ElementType,
  ExportBlock,
  FootnoteDefinition,
  GreaterElementType,
  LatexEnvironment,
  LatexFragment,
  List,
  ListItem,
  ObjectType,
  OrgData,
  OrgNode,
  Paragraph,
  QuoteBlock,
  Section,
  SpecialBlock,
  SrcBlock,
  Table,
  VerseBlock,
} from 'uniorg'
import { Node } from 'unist'

export type PhrasingContent =
  | Section
  | List
  | ListItem
  | QuoteBlock
  | VerseBlock
  | CenterBlock
  | SrcBlock
  | SpecialBlock
  | FootnoteDefinition
  | Table
  | Paragraph
  | LatexEnvironment
  | LatexFragment
  | ExportBlock
const isPhrasing = (node: OrgNode): node is PhrasingContent =>
  [
    'section',
    'list',
    'list-item',
    'quote-block',
    'src-block',
    'latex-environment',
    'latex-fragment',
    'verse-block',
    'center-block',
    'special-block',
    'footnote-definition',
    'table',
    'paragraph',
  ].includes(node.type)

export const firstPhrasing = (node: OrgData): PhrasingContent | null => {
  const ge = node.children.find((node) => isPhrasing(node)) as PhrasingContent

  return ge ?? null
}
