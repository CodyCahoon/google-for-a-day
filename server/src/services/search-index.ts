import { Page } from '../interfaces/page.interface';

/**
 * Usage:
 *
 * This implementation is specific for a Page object and indexes based Page.tokens
 *
 * @todo
 * - refactor unique key for a Page (currently hard-coded to be Page.url)
 * - refactor method of indexing to use tf-idf weighting
 * - refactor to allow changing of indexed field (currently hard-coded to Page.tokens)
 */
export class SearchIndex {
    private tokenToIdToPage = new Map<string, Map<string, Page>>();
    private tokenToIdToOccurrences = new Map<string, Map<string, number>>();
    private indexedUrls = new Set<string>();

    public clear(): void {
        this.tokenToIdToPage = new Map<string, Map<string, Page>>();
        this.tokenToIdToOccurrences = new Map<string, Map<string, number>>();
        this.indexedUrls = new Set<string>();
    }

    public hasIndexedUrl(url: string): boolean {
        return this.indexedUrls.has(url);
    }

    public indexPage(page: Page): IndexDatum {
        const datum: IndexDatum = {
            pages: 1,
            tokens: 0,
        };

        const indexToken = (token: string) => {
            datum.tokens++;
            const hasToken = this.tokenToIdToPage.has(token);
            if (!hasToken) {
                this.tokenToIdToPage.set(token, new Map());
                this.tokenToIdToOccurrences.set(token, new Map());
            }

            const idsToPage = this.tokenToIdToPage.get(token);
            idsToPage!.set(page.url, page);

            const idsToOccurrences = this.tokenToIdToOccurrences.get(token);
            const tokenCount = idsToOccurrences!.get(page.url) || 0;
            idsToOccurrences!.set(page.url, tokenCount + 1);
        };

        page.tokens.forEach((token: string) => indexToken(token));
        this.indexedUrls.add(page.url);

        return datum;
    }

    public search(token: string): SearchDatum[] {
        const hasToken = this.tokenToIdToPage.has(token);
        if (!hasToken) {
            return [];
        }

        const idsToPage = this.tokenToIdToPage.get(token);
        const idsToOccurrences = this.tokenToIdToOccurrences.get(token);

        const unsortedPages = Array.from(idsToPage!.values()) as Page[];
        return unsortedPages
            .map((page: Page) => {
                return {
                    occurrences: idsToOccurrences!.get(page.url),
                    title: page.title,
                    url: page.url,
                };
            })
            .sort((a: SearchDatum, b: SearchDatum) => {
                const diff = b.occurrences - a.occurrences;
                if (diff === 0) {
                    const titleA = (a.title || '') as string;
                    const titleB = (b.title || '') as string;
                    return titleA.toLowerCase().localeCompare(titleB.toLowerCase());
                }
                return diff;
            });
    }
}

export interface IndexDatum {
    pages: number;
    tokens: number;
}

export interface SearchDatum {
    occurrences: number;
    title: string;
    url: string;
}
