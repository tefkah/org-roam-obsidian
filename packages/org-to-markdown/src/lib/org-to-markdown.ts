import { Node } from 'unist'
import { collectLinks, readDirectory } from 'collect-org-roam-links'
import uniorgParse from 'uniorg-parse'
import uniorgRemark, { Options } from 'uniorg-remark'
import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import { Paragraph, Text } from 'mdast'
import remarkMath from 'remark-math'
import path, { join } from 'path'
import remarkStringify from 'remark-stringify'
import remarkGFM from 'remark-gfm'
import remarkFrontMatter from 'remark-frontmatter'
import { citePlugin, CitePluginOptions } from '@benrbray/remark-cite'
import { convert } from 'unist-util-is'
//@ts-expect-error remark-wiki-link does not have decl
import remarkWikiLink from 'remark-wiki-link'
import { access, writeFile } from 'fs/promises'
import { VFile } from 'vfile'
import { mkdirSync } from 'fs'

const isText = convert<Text>('text')
export async function orgToMarkdown(
  dir: string,
  out?: string,
  options?: Options
) {
  const links = await collectLinks(dir)
  const files = await readDirectory(dir)
  console.log('Reading files')
  const proc = unified()
    .use(uniorgParse)
    .use(uniorgRemark, { idData: links })
    // remove excess brackets
    .use(() => (tree) => {
      visit(tree, 'paragraph', (par: Paragraph) => {
        par.children = par.children.flatMap((child) => {
          if (!isText(child)) {
            return child
          }
          if (['[', ']'].includes(child.value)) return []
          child.value = child.value.replace(/(\w)\n(\w)/g, '$1 $2')
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

  const { pathArr, fileArr } = files.reduce(
    (acc, curr) => {
      acc.pathArr.push(curr.path)
      acc.fileArr.push(curr.file)
      return acc
    },
    { pathArr: [] as string[], fileArr: [] as string[] }
  )

  const mdFiles: Promise<VFile>[] = []
  console.log('Converting files')
  for (const entry of files) {
    mdFiles.push(proc.process(entry.file))
  }
  const vfiles = await Promise.all(mdFiles)

  console.log('Writing files...')
  let num = 0
  for (const file of vfiles) {
    const mdpath = join(out || dir, `${pathArr[num]}`.replace('org', 'md'))
    try {
      await writeFile(mdpath, String(file))
    } catch (e) {
      mkdirSync(path.dirname(mdpath))
      await writeFile(mdpath, String(file))
    }
    num++
  }
  console.log('Done!')
}
