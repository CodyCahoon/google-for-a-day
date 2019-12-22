import fetch, { Response } from 'node-fetch';
import { ParseUtil } from '../utils/parse.util';
import { IndexDatum, SearchDatum, SearchIndex } from './search-index';
import { SanitizeUtil } from '../utils/sanitize.util';

export class SearchService {
    private maxIndexDepth = 3;
    private searchIndex = new SearchIndex();

    public clearIndex(): void {
        this.searchIndex.clear();
    }

    public indexUrl(url: string, parentUrls: string[] = []): Promise<IndexDatum> {
        const isAtMaxIndexDepth = parentUrls.length >= this.maxIndexDepth;
        if (isAtMaxIndexDepth) {
            return this.getDefaultIndexDatum();
        }

        const hasAlreadyIndexedUrl =
            parentUrls.includes(url) || this.searchIndex.hasIndexedUrl(url);
        if (hasAlreadyIndexedUrl) {
            return this.getDefaultIndexDatum();
        }

        const indexData = (data: string) => {
            const page = ParseUtil.getPage(data, url);
            const indexDatum = this.searchIndex.indexPage(page);

            if (page.externalUrls.length === 0) {
                return Promise.resolve(indexDatum);
            }

            const indexUrls = page.externalUrls.map((externalUrl: string) => {
                return this.indexUrl(externalUrl, [...parentUrls, url]);
            });

            return Promise.all(indexUrls).then((data: IndexDatum[]) => {
                return data.reduce((total: IndexDatum, current: IndexDatum) => {
                    const pages = total.pages + current.pages;
                    const tokens = total.tokens + current.tokens;
                    return { pages, tokens };
                }, indexDatum);
            });
        };

        return fetch(url)
            .then((resp: Response) => resp.text())
            .then((data: string) => indexData(data))
            .catch(() => this.getDefaultIndexDatum());
    }

    public search(query: string): SearchDatum[] {
        if (!query) {
            return [];
        }

        const token = SanitizeUtil.sanitize(query);
        return this.searchIndex.search(token);
    }

    private getDefaultIndexDatum(): Promise<IndexDatum> {
        return Promise.resolve({
            pages: 0,
            tokens: 0,
        });
    }
}
