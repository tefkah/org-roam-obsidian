import { fstat, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import uniorgParse from 'uniorg-parse'
import { toMdast } from '../orgast-util-to-mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import remarkStringify from 'remark-stringify'
import remarkHTML from 'remark-html'
import { unified } from 'unified'
import { MdastContent, Options, MdastRoot, Text } from '../types'
import { removePosition } from 'unist-util-remove-position'
import remarkGFM from 'remark-gfm'
import remarkFrontMatter from 'remark-frontmatter'
import remarkMath from 'remark-math'
import { citePlugin, CitePluginOptions } from '@benrbray/remark-cite'

import { convert } from 'unist-util-is'
import { visit } from 'unist-util-visit'

// @ts-expect-error no types for remark-wiki-link sadge
import remarkWikiLink from 'remark-wiki-link'
import { OrgData } from 'uniorg'
import { Paragraph } from 'mdast'
const isText = convert<Text>('text')
// const remarkCite = citePlugin as Plugin<
//   [CitePluginOptions?] | void[],
//   MdastRoot
// >
//describe('fixtures', () => {
const fromOrg = (config: Options = {}) =>
  unified()
    .use(uniorgParse)
    // @ts-expect-error yaya
    .use(() => {
      return transformer
      function transformer(tree: OrgData) {
        return toMdast(tree, config)
      }
    })
    // find cite://b thingies
    // remove excess brackets
    .use(() => (tree) => {
      visit(tree, 'paragraph', (par: Paragraph) => {
        par.children = par.children.flatMap((child) => {
          if (!isText(child)) {
            return child
          }
          if (['[', ']'].includes(child.value)) return []
          child.value = child.value
            .replace(/(\w)\n(\w)/g, '$1 $2')
            .replace(/\n?\t+/, ' ')
          return child
        })
      })
    })
    .use(remarkMath)
    .use(remarkGFM)
    .use(citePlugin, {})
    .use(remarkFrontMatter)
    .use(remarkWikiLink, { aliasDivider: '|' })
    .use(remarkStringify, {
      bullet: '-',
      listItemIndent: 'one',
      bulletOrdered: ')',
      emphasis: '_',
      handlers: {
        rawText: (node) => node.value,
      },
    })

const fixtures = join(__dirname, 'fixtures')
const dir = readdirSync(fixtures)

describe.each(dir)('parses correctly for %s', (name: string) => {
  const [org, markdown, json] = ['index.org', 'index.md', 'index.json'].map(
    (ext) => join(fixtures, name, ext)
  )

  const orgIn = String(readFileSync(org))
  const mdOut = String(readFileSync(markdown))

  let config: Options | undefined
  try {
    config = JSON.parse(String(readFileSync(json)))
  } catch (e) {
    console.error(e)
  }
  const proc = fromOrg(config)

  let orgTree: OrgData = {
    type: 'org-data',
    children: [],
    contentsBegin: 0,
    contentsEnd: 0,
  }
  try {
    orgTree = removePosition(proc.parse(orgIn), true) as OrgData
    writeFileSync(
      join(fixtures, name, 'debugORG.json'),
      JSON.stringify(orgTree, null, 2)
    )
  } catch (e) {
    console.error(e)
  }

  // console.dir(xmlTree, { depth: null })

  let tree: MdastRoot = { type: 'root', children: [] }
  try {
    tree = removePosition(proc.runSync(orgTree), true)
    writeFileSync(
      join(fixtures, name, 'debugMD.json'),
      JSON.stringify(tree, null, 2)
    )
  } catch (e) {
    console.error('woops')
    console.error(e)
  }
  //console.dir(tree, { depth: null })

  const mdTree = String(proc.processSync(orgIn))

  // test('should match snapshot', () => {
  //   expect(lx).toMatchSnapshot()
  // })
  it('should match predefined thing', () => {
    expect(mdTree).toEqual(mdOut)
  })
})
