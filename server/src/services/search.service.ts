import fetch, { FetchError, Response } from "node-fetch";
import { Page } from "../interfaces/page.interface";
import { ParseUtil } from "../utils/parse.util";
import { IndexDatum, SearchDatum, SearchIndex } from "./search-index";

export class SearchService {
  private maxIndexDepth = 2;

  private searchIndex = new SearchIndex();

  public clearIndex(): void {
    this.searchIndex.clear();
  }

  public indexUrl(url: string, parentUrls: string[] = []): Promise<IndexDatum> {
    if (parentUrls.length === this.maxIndexDepth) {
      return Promise.resolve({ pages: 0, tokens: 0 });
    }

    if (parentUrls.includes(url)) {
      return Promise.resolve({ pages: 0, tokens: 0 });
    }

    return fetch(url)
      .then((resp: Response) => resp.text())
      .then((data: string) => {
        const page = ParseUtil.getPage(data, url);
        const indexDatum = this.searchIndex.indexPage(page);

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
      })
      .catch((e: FetchError) => {
        console.log(e);
        return Promise.resolve({ pages: 0, tokens: 0 });
      });
  }

  public search(query: string): SearchDatum[] {
    return this.searchIndex.search(query);
  }
}
