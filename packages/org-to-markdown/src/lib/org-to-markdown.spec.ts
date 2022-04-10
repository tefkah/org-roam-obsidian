import {Node} from 'unist'
import { org-to-markdown } from './org-to-markdown';

describe('org-to-markdown', () => {

    it('should work', () => {

        expect(org-to-markdown({type:'root',children:[]} as Node)).toBeDefined();
    })
})
