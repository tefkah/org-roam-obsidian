import { fstat, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import uniorgParse from 'uniorg-parse'
import { toMdast } from '../orgast-util-to-mdast'
import { toMarkdown } from 'mdast-util-to-markdown'
import remarkStringify from 'remark-stringify'
import remarkHTML from 'remark-html'
import { unified } from 'unified'
import { MdastContent, Options, MdastRoot } from '../types'
import { removePosition } from 'unist-util-remove-position'
import remarkGFM from 'remark-gfm'
import remarkFrontMatter from 'remark-frontmatter'
import remarkMath from 'remark-math'

//describe('fixtures', () => {
const fromOrg = (config: Options = {}) =>
  unified()
    .use(uniorgParse)
    // @ts-expect-error yaya
    .use(() => {
      return transformer
      function transformer(tree: MdastRoot | MdastContent) {
        return toMdast(tree, config)
      }
    })
    .use(remarkMath)
    .use(remarkGFM)
    .use(remarkFrontMatter)
    .use(remarkStringify, {
      bullet: '-',
      listItemIndent: 'one',
      bulletOrdered: ')',
      emphasis: '_',
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

  const orgTree = removePosition(proc.parse(orgIn), true)
  // console.dir(xmlTree, { depth: null })

  let tree: MdastRoot = { type: 'root', children: [] }
  try {
    tree = removePosition(proc.runSync(orgTree), true)
    writeFileSync(
      join(fixtures, name, 'debug.json'),
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
  test('should match predefined thing', () => {
    expect(mdTree).toEqual(mdOut)
  })
})
