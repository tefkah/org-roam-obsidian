import {Node} from 'unist'
import { uniorg-remark } from './uniorg-remark';

describe('uniorg-remark', () => {

    it('should work', () => {

        expect(uniorg-remark({type:'root',children:[]} as Node)).toBeDefined();
    })
})
