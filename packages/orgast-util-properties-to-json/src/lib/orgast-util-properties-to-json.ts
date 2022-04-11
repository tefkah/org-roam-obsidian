import { OrgData, NodeProperty } from 'uniorg'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

export interface OrgastProperties {
  [key: string]: string
}
export function getProperties(node: OrgData): OrgastProperties | null {
  const properties = {} as OrgastProperties
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore stupid bug
  visit(node, 'node-property', (prop: NodeProperty) => {
    const { key, value } = prop
    properties[key.toLowerCase()] = value
  })
  return Object.keys(properties).length ? properties : null
}
