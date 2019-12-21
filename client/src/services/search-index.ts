import { Page } from './types';

export class SearchIndex {
    private tokenToIdToPage = new Map<string, Map<string, Page>>();
    private tokenToIdToCount = new Map<string, Map<string, number>>();

    public clear(): void {
        this.tokenToIdToPage = new Map<string, Map<string, Page>>();
        this.tokenToIdToCount = new Map<string, Map<string, number>>();
    }

    public indexPage(token: string, page: Page): IndexData {
        const data: IndexData = {
            pagesAdded: 0,
        };

        const hasToken = this.tokenToIdToPage.has(token);
        if (!hasToken) {
            this.tokenToIdToPage.set(token, new Map());
            this.tokenToIdToCount.set(token, new Map());
        }

        const idsToPage = this.tokenToIdToPage.get(token) as Map<string, Page>;
        const isPageIndexed = idsToPage.has(page.id);
        data.pagesAdded = isPageIndexed ? 0 : 1;
        idsToPage!.set(page.id, page);

        const idsToCount = this.tokenToIdToCount.get(token) as Map<string, number>;
        const tokenCount = idsToCount!.get(page.id) as number;
        idsToCount!.set(page.id, tokenCount + 1);

        return data;
    }

    public search(token: string): Page[] {
        const hasToken = this.tokenToIdToPage.has(token);
        if (!hasToken) {
            return [];
        }

        const idsToPage = this.tokenToIdToPage.get(token);
        const idsToCount = this.tokenToIdToCount.get(token);

        const unsortedPages = Array.from(idsToPage!.values()) as Page[];
        return unsortedPages.sort((a: Page, b: Page) => {
            const tokenCountOnPageA = idsToCount!.get(a.id) as number;
            const tokenCountOnPageB = idsToCount!.get(b.id) as number;
            const diff = tokenCountOnPageA - tokenCountOnPageB;

            if (diff === 0) {
                return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase());
            }
            return diff;
        });
    }
}

export interface IndexData {
    pagesAdded: 0 | 1;
}
