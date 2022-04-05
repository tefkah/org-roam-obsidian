import {Node} from 'unist'
import { orgast-util-to-mdast } from './orgast-util-to-mdast';

describe('orgast-util-to-mdast', () => {

    it('should work', () => {

        expect(orgast-util-to-mdast({type:'root',children:[]} as Node)).toBeDefined();
    })
})
