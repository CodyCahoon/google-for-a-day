// import { SearchIndex } from './search-index';
// import { Page } from './types';
//
// describe('SearchIndex', () => {
//     let searchIndex: SearchIndex;
//
//     beforeEach(() => {
//         searchIndex = new SearchIndex();
//     });
//
//     it('should index a single page', () => {
//         const page1 = initPage('1');
//         const token = 'apple';
//
//         searchIndex.indexPage(token, page1);
//
//         const pages = searchIndex.search(token);
//         expect(pages.length).toBe(1);
//     });
//
//     it('should properly sort pages when token counts are all different', () => {
//         const page1 = initPage('1');
//         const page2 = initPage('2');
//         const page3 = initPage('3');
//         const token = 'apple';
//
//         searchIndex.indexPage(token, page1);
//         searchIndex.indexPage(token, page1);
//         searchIndex.indexPage(token, page1);
//         searchIndex.indexPage(token, page2);
//         searchIndex.indexPage(token, page2);
//         searchIndex.indexPage(token, page3);
//
//         const pages = searchIndex.search(token);
//         expect(pages[0]).toBe(page1);
//         expect(pages[1]).toBe(page2);
//         expect(pages[2]).toBe(page3);
//     });
//
//     it('should properly sort pages by title when token counts are equal', () => {
//         const page1 = initPage('1', 'Apple apple');
//         const page2 = initPage('2', 'Banana apple apple');
//         const token = 'apple';
//
//         searchIndex.indexPage(token, page1);
//         searchIndex.indexPage(token, page2);
//         searchIndex.indexPage(token, page1);
//         searchIndex.indexPage(token, page2);
//
//         const pages = searchIndex.search(token);
//         expect(pages[0]).toBe(page1);
//         expect(pages[1]).toBe(page2);
//     });
//
//     it('should return 1 page added when adding a page for the first time', () => {
//         const page1 = initPage('1');
//         const token = 'apple';
//
//         const data = searchIndex.indexPage(token, page1);
//
//         expect(data.pagesAdded).toBe(1);
//     });
//
//     it('should return 0 pages added when adding a page for the second time', () => {
//         const page1 = initPage('1');
//         const token = 'apple';
//
//         searchIndex.indexPage(token, page1);
//         const data = searchIndex.indexPage(token, page1);
//
//         expect(data.pagesAdded).toBe(0);
//     });
//
//     it('should return 0 pages after the search index is cleared', () => {
//         const page1 = initPage('1');
//         const token = 'apple';
//
//         searchIndex.indexPage(token, page1);
//         searchIndex.clear();
//
//         const pages = searchIndex.search(token);
//         expect(pages.length).toBe(0);
//     });
//
//     function initPage(id: string, title = randomString()): Page {
//         return {
//             id,
//             title,
//             url: randomString(),
//             content: randomString(),
//         };
//     }
//
//     /**
//      * Generates a random string
//      * https://gist.github.com/6174/6062387
//      */
//     function randomString(): string {
//         return (
//             Math.random()
//                 .toString(36)
//                 .substring(2, 15) +
//             Math.random()
//                 .toString(36)
//                 .substring(2, 15)
//         );
//     }
// });
