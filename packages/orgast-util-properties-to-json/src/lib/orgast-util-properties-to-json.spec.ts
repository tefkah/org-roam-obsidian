import {Node} from 'unist'
import { orgast-util-properties-to-json } from './orgast-util-properties-to-json';

describe('orgast-util-properties-to-json', () => {

    it('should work', () => {

        expect(orgast-util-properties-to-json({type:'root',children:[]} as Node)).toBeDefined();
    })
})
