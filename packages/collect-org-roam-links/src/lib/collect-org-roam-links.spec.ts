import {Node} from 'unist'
import { collect-org-roam-links } from './collect-org-roam-links';

describe('collect-org-roam-links', () => {

    it('should work', () => {

        expect(collect-org-roam-links({type:'root',children:[]} as Node)).toBeDefined();
    })
})
