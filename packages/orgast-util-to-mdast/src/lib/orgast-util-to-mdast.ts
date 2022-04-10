import { one } from './one'
import { handlers } from './handlers/index'
import { own } from './util/own'

import {
  Context,
  J,
  JWithoutProps,
  JWithProps,
  MdastContent,
  MdastRoot,
  Node,
  Options,
  Properties,
  MdastFrontMatterContent,
} from './types'
import { convert } from 'unist-util-is'

export { one } from './one'
export { all } from './all'
export { handlers as defaultHandlers }

const block = convert(['heading', 'paragraph', 'root'])

export function toMdast(tree: MdastRoot | MdastContent, options?: Options) {
  options = {
    newLines: false,
    checked: '[x]',
    unchecked: '[ ]',
    quotes: ['"'],
    frontMatterFormat: 'yaml',
    ...options,
  }
  // const byId: { [s: string]: Element } = {}
  let mdast: MdastContent | MdastRoot

  // TODO: fix this type error
  const j: J = Object.assign(
    ((
      node: MdastRoot | MdastContent,
      type: string,
      props?: Properties | string | Array<MdastContent>,
      children?: string | Array<MdastContent>
    ) => {
      let attributes: Properties | undefined

      if (typeof props === 'string' || Array.isArray(props)) {
        children = props
        attributes = {}
      } else {
        attributes = props
      }

      // @ts-expect-error Assume valid `type` and `children`/`value`.
      const result: Node = { type, ...attributes }

      if (typeof children === 'string') {
        // @ts-expect-error: Looks like a literal.
        result.value = children
      } else if (children) {
        // @ts-expect-error: Looks like a parent.
        result.children = children
      }

      if (node.position) {
        result.position = node.position
      }

      return result as MdastContent
    }) as JWithProps & JWithoutProps,
    {
      //  nodeById: byId,
      baseFound: false,
      inTable: false,
      wrapText: true,
      /** @type {string|null} */
      frozenBaseUrl: null,
      qNesting: 0,
      handlers: options.handlers
        ? { ...handlers, ...options.handlers }
        : handlers,
      document: options.document,
      checked: options.checked || '[x]',
      unchecked: options.unchecked || '[ ]',
      quotes: options.quotes || ['"'],
      frontMatter: options?.frontMatter || [],
      frontMatterFormat: options.frontMatterFormat,
      keywordFrontMatterMap: options.keywordFrontMatterMap || {
        roam_refs: 'citekey',
      },
      ignoredKeywords: options.ignoredKeywords || [],
      citationAnalyzer:
        options.citationAnalyzer || ((node: Node) => 'autocite'),
    } as Context
  )

  // visit(tree, 'element', (node) => {
  //   const id =
  //     node.attributes &&
  //     'id' in node.attributes &&
  //     String(node.attributes.id).toUpperCase()

  //   if (id && !own.call(byId, id)) {
  //     byId[id] = node
  //   }
  // })

  // @ts-expect-error: does return a transformer, that does accept any node.
  const result = one(j, tree, undefined)

  const frontMatter = j.frontMatter?.length
    ? ({
        type: options?.frontMatterFormat || 'yaml',
        value: j.frontMatter
          .map((entry) => `${entry.key}: ${entry.value}`)
          .join('\n'),
      } as MdastFrontMatterContent)
    : null

  if (!result) {
    mdast = { type: 'root', children: frontMatter ? [frontMatter] : [] }
  } else if (Array.isArray(result)) {
    frontMatter && result.unshift(frontMatter)
    mdast = { type: 'root', children: result }
  } else {
    mdast = result
  }

  // visit(mdast, 'text', ontext)

  return mdast

  /**
   * Collapse text nodes, and fix whitespace.
   * Most of this is taken care of by `rehype-minify-whitespace`, but
   * we’re generating some whitespace too, and some nodes are in the end
   * ignored.
   * So clean up.
   *
   //* {import('unist-util-visit/complex-types').BuildVisitor MdastRoot, 'text'>}
   */
  function ontext(node: any, index: any, parent: any) {
    /* c8 ignore next 3 */
    if (index === null || !parent) {
      return
    }

    const previous = parent.children[index - 1]

    if (previous && previous.type === node.type) {
      previous.value += node.value
      parent.children.splice(index, 1)

      if (previous.position && node.position) {
        previous.position.end = node.position.end
      }

      // Iterate over the previous node again, to handle its total value.
      return index - 1
    }

    node.value = node.value.replace(/[\t ]*(\r?\n|\r)[\t ]*/, '$1')

    // We don’t care about other phrasing nodes in between (e.g., `[ asd ]()`),
    // as there the whitespace matters.
    if (parent && block(parent)) {
      if (!index) {
        node.value = node.value.replace(/^[\t ]+/, '')
      }

      if (index === parent.children.length - 1) {
        node.value = node.value.replace(/[\t ]+$/, '')
      }
    }

    if (!node.value) {
      parent.children.splice(index, 1)
      return index
    }
  }
}
