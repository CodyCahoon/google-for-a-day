import fetch, { Response } from 'node-fetch';
import { ParseUtil } from '../utils/parse.util';
import { IndexDatum, SearchDatum, SearchIndex } from './search-index';
import { SanitizeUtil } from '../utils/sanitize.util';
import { UrlUtil } from '../utils/url.util';

export class SearchService {
    private maxIndexDepth = 1;
    private searchIndex = new SearchIndex();

    public clearIndex(): void {
        this.searchIndex.clear();
    }

    public indexUrl(url: string, depth = 1): Promise<IndexDatum> {
        const cleanedUrl = UrlUtil.cleanUrl(url);

        if (!UrlUtil.isValidUrl(url)) {
            return this.getDefaultIndexDatum();
        }

        if (this.searchIndex.hasIndexedUrl(cleanedUrl)) {
            return this.getDefaultIndexDatum();
        }

        const indexData = (data: string) => {
            const page = ParseUtil.getPage(data, cleanedUrl);
            const indexDatum = this.searchIndex.indexPage(page);

            const isAtMaxIndexDepth = depth === this.maxIndexDepth;
            const hasExternalUrls = page.externalUrls.length > 0;
            if (isAtMaxIndexDepth || !hasExternalUrls) {
                return Promise.resolve(indexDatum);
            }

            const indexUrls = page.externalUrls.map((externalUrl: string) => {
                return this.indexUrl(externalUrl, depth + 1);
            });

            return Promise.all(indexUrls).then((data: IndexDatum[]) => {
                return data.reduce((total: IndexDatum, current: IndexDatum) => {
                    const pages = total.pages + current.pages;
                    const tokens = total.tokens + current.tokens;
                    return { pages, tokens };
                }, indexDatum);
            });
        };

        return fetch(cleanedUrl)
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
