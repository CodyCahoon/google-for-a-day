import { SearchIndex } from './search-index';
import { Page } from '../interfaces/page.interface';

describe('SearchIndex', () => {
    let searchIndex: SearchIndex;

    beforeEach(() => {
        searchIndex = new SearchIndex();
    });

    it('should index a single page', () => {
        const page1 = initPage(['aaa']);

        searchIndex.indexPage(page1);

        const pages = searchIndex.search('aaa');
        expect(pages.length).toBe(1);
    });

    it('should properly sort pages when token counts are all different', () => {
        const page1 = initPage(['aaa'], 'A');
        const page2 = initPage(['bbb', 'aaa'], 'B');
        const page3 = initPage(['ccc', 'bbb', 'aaa'], 'C');

        searchIndex.indexPage(page1);
        searchIndex.indexPage(page1);
        searchIndex.indexPage(page1);
        searchIndex.indexPage(page2);
        searchIndex.indexPage(page2);
        searchIndex.indexPage(page3);

        const pages = searchIndex.search('aaa');
        expect(pages[0].title).toBe('A');
        expect(pages[1].title).toBe('B');
        expect(pages[2].title).toBe('C');
    });

    it('should properly sort pages by title when token counts are equal', () => {
        const page1 = initPage(['aaa'], 'A');
        const page2 = initPage(['aaa'], 'B');

        searchIndex.indexPage(page1);
        searchIndex.indexPage(page2);
        searchIndex.indexPage(page2);
        searchIndex.indexPage(page1);

        const pages = searchIndex.search('aaa');
        expect(pages[0].title).toBe('A');
        expect(pages[1].title).toBe('B');
    });

    it('should return the total number of pages and tokens indexed', () => {
        const page1 = initPage(['aaa', 'bbb']);
        const data = searchIndex.indexPage(page1);

        expect(data.pages).toBe(1);
        expect(data.tokens).toBe(2);
    });

    it('should return 0 pages after the search index is cleared', () => {
        const page1 = initPage(['aaa']);

        searchIndex.indexPage(page1);
        searchIndex.clear();

        const pages = searchIndex.search('aaa');
        expect(pages.length).toBe(0);
    });

    function initPage(tokens: string[] = [], title = randomString()): Page {
        return {
            tokens,
            title,
            externalUrls: [],
            url: randomString(),
        };
    }

    /**
     * Generates a random string
     * https://gist.github.com/6174/6062387
     */
    function randomString(): string {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    }
});
