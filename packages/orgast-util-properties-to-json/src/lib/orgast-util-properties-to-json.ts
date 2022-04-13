import { OrgData, NodeProperty } from 'uniorg'
import { Node } from 'unist'
import { visit } from 'unist-util-visit'

export interface OrgastProperties {
  [key: string]: string | number
}
export function getProperties(
  node: OrgData,
  map?: { [key: string]: string }
): OrgastProperties | null {
  const properties = {} as OrgastProperties
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore stupid bug
  visit(node, 'node-property', (prop: NodeProperty) => {
    const { key, value } = prop
    let val: string | number
    try {
      val = value.match(/^\d+$/) ? parseInt(value, 10) : value
      if (typeof val === 'number' && isNaN(val)) val = value
    } catch (e) {
      val = value
    }
    properties[map?.[key.toLowerCase()] ?? key.toLowerCase()] = val
  })
  return Object.keys(properties).length ? properties : null
}
