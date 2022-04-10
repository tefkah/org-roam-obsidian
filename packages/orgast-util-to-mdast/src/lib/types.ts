import { Node as UnistNode, Parent as UnistParent } from 'unist'

import {
  Parent as MdastParent,
  Content,
  Literal as MdastLiteral,
  Root as MdastRoot,
  PhrasingContent as MdastPhrasingContent,
  FrontmatterContentMap,
} from 'mdast'

import {} from 'micromark-extension-gfm'

type MdastFrontMatterContent =
  FrontmatterContentMap[keyof FrontmatterContentMap]

type MdastContent = Content | MdastFrontMatterContent
import {
  //Node,
  GreaterElement as OrgastParent,
  GreaterElementType,
  ElementType,
  ObjectType,
  Element as OrgastElement,
  Text as OrgastText,
  OrgData as OrgastRoot,
} from 'uniorg'

type OrgastContent = GreaterElementType | ElementType | ObjectType | OrgastRoot
/**
 * uniorg Node
 */
export type Node = OrgastContent
export type Properties = Record<string, unknown>

export interface Options {
  handlers?: { [handle: string]: Handle }
  document?: boolean
  newLines?: boolean
  checked?: string
  unchecked?: string
  quotes?: Array<string>
  frontMatter?: [{ key: string; value: string }]
  frontMatterFormat?: 'yaml' | 'toml'
  keywordFrontMatterMap?: [{ key: string; value: string }]
  ignoredKeywords?: string[]
  citationAnalyzer?: (node: Node) => string
}

export type Handle = (
  j: J,
  node: any,
  parent?: OrgastParent
) => MdastContent | Array<MdastContent> | void

export interface Context {
  nodeById?: {
    [id: string]: Element
  }
  baseFound: boolean
  frozenBaseUrl: string | null
  wrapText: boolean
  inTable: boolean
  qNesting: number
  handlers: { [handler: string]: Handle }
  document: boolean | undefined
  frontMatter: [{ key: string; value: string }]
  keywordFrontMatterMap: { [key: string]: string }
  ignoredKeywords: string[]
  checked: string
  unchecked: string
  quotes: Array<string>
  citationAnalyzer: (node: Node) => string
}

export type JWithProps<T extends MdastContent['type'] = MdastContent['type']> =
  (
    node: Node,
    //type: string,
    type: T,
    props?: Properties,
    children?: string | Array<MdastContent>
  ) => Extract<MdastContent, { type: T }> extends never
    ? MdastContent
    : Extract<MdastContent, { type: T }>

export type JWithoutProps<
  T extends MdastContent['type'] = MdastContent['type']
> = (
  node: Node,
  type: T,
  children?: string | Array<MdastContent>
) => Extract<MdastContent, { type: T }> extends never
  ? MdastContent
  : Extract<MdastContent, { type: T }>

export type J = JWithProps & JWithoutProps & Context

export type {
  OrgastParent,
  OrgastRoot,
  OrgastElement,
  OrgastContent,
  MdastLiteral,
  MdastContent,
  MdastParent,
  MdastRoot,
  MdastPhrasingContent,
  MdastFrontMatterContent,
  OrgastText as Text,
}

export type Parents = Extract<
  Exclude<Node, Text | OrgastRoot>,
  { children: any[] }
>
