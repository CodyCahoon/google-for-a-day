import fetch, { Response } from 'node-fetch';
import { IndexDatum, SearchDatum, SearchIndex } from './search-index';
import { SanitizeUtil } from '../utils/sanitize.util';
import { UrlUtil } from '../utils/url.util';
import { ParseService } from './parse.service';
import { Page } from '../interfaces/page.interface';
import { clearTimeout } from 'timers';

export class SearchService {
    private maxIndexDepth = 3;
    private parser = new ParseService();
    private searchIndex = new SearchIndex();

    public clearIndex(): void {
        this.searchIndex.clear();
    }

    public index(url: string): Promise<IndexDatum> {
        return this.indexUrl(url).then((page: Page) => this.indexPages([page]));
    }

    private indexPages(pages: Page[], depth = 1): Promise<IndexDatum> {
        if (depth === this.maxIndexDepth) {
            return Promise.resolve(
                pages
                    .filter((p: Page) => !!p)
                    .map((p: Page) => this.searchIndex.indexPage(p))
                    .reduce(
                        (total: IndexDatum, current: IndexDatum) => {
                            const pages = total.pages + current.pages;
                            const tokens = total.tokens + current.tokens;
                            return { pages, tokens };
                        },
                        { pages: 0, tokens: 0 },
                    ),
            );
        }

        const externalUrls = this.getExternalUrls(pages);
        const indexUrls$ = externalUrls.map((externalUrl: string) => {
            return this.indexUrl(externalUrl);
        });

        return Promise.all(indexUrls$).then((pages: Page[]) => this.indexPages(pages, depth + 1));
    }

    /**
     * Indexes a single url, with a max timeout
     */
    private indexUrl(url: string, maxTimeoutMs = 5000): Promise<Page | null> {
        const cleanedUrl = UrlUtil.cleanUrl(url);

        let timeoutId: NodeJS.Timeout;

        const timeLimit$ = new Promise(resolve => {
            timeoutId = setTimeout(() => resolve(), maxTimeoutMs);
        });

        const page$ = fetch(cleanedUrl).then((resp: Response) => resp.text());

        return Promise.race([timeLimit$, page$])
            .then((data: string) => {
                clearTimeout(timeoutId);

                if (!data) {
                    return null;
                }
                return this.parser.parseData(data, cleanedUrl);
            })
            .catch(() => Promise.resolve(null));
    }

    private getExternalUrls(pages: Page[]): string[] {
        const validPages = pages.filter(p => !!p);
        const externalUrls = new Set<string>();
        validPages.forEach(p => {
            p.externalUrls.forEach(u => externalUrls.add(u));
        });

        validPages.forEach(p => {
            externalUrls.delete(p.url);
        });

        return Array.from(externalUrls);
    }

    public search(query: string): SearchDatum[] {
        if (!query) {
            return [];
        }

        const token = SanitizeUtil.sanitize(query);
        return this.searchIndex.search(token);
    }
}
