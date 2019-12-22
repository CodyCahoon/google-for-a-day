import { Page } from "../interfaces/page.interface";
import { SanitizeUtil } from "../utils/sanitize.util";

export class SearchIndex {
  private tokenToIdToPage = new Map<string, Map<string, Page>>();
  private tokenToIdToOccurrences = new Map<string, Map<string, number>>();

  public clear(): void {
    this.tokenToIdToPage = new Map<string, Map<string, Page>>();
    this.tokenToIdToOccurrences = new Map<string, Map<string, number>>();
  }

  public indexPage(page: Page): IndexDatum {
    const data: IndexDatum = {
      pages: 1,
      tokens: 0
    };

    const indexToken = (token: string) => {
      data.tokens++;
      const hasToken = this.tokenToIdToPage.has(token);
      if (!hasToken) {
        this.tokenToIdToPage.set(token, new Map());
        this.tokenToIdToOccurrences.set(token, new Map());
      }

      const idsToPage = this.tokenToIdToPage.get(token) as Map<string, Page>;
      idsToPage!.set(page.url, page);

      const idsToOccurrences = this.tokenToIdToOccurrences.get(token) as Map<
        string,
        number
      >;
      const tokenCount = (idsToOccurrences!.get(page.url) || 0) as number;
      idsToOccurrences!.set(page.url, tokenCount + 1);
    };

    page.tokens.forEach((token: string) => indexToken(token));

    return data;
  }

  public search(token: string): SearchDatum[] {
    const sanitizedToken = SanitizeUtil.sanitize(token);

    const hasToken = this.tokenToIdToPage.has(sanitizedToken);
    if (!hasToken) {
      return [];
    }

    const idsToPage = this.tokenToIdToPage.get(sanitizedToken);
    const idsToOccurrences = this.tokenToIdToOccurrences.get(sanitizedToken);

    const unsortedPages = Array.from(idsToPage!.values()) as Page[];
    return unsortedPages
      .map((page: Page) => {
        return {
          occurrences: idsToOccurrences!.get(page.url),
          title: page.title,
          url: page.url
        };
      })
      .sort((a: SearchDatum, b: SearchDatum) => {
        const diff = b.occurrences - a.occurrences;
        if (diff === 0) {
          const titleA = (a.title || "") as string;
          const titleB = (b.title || "") as string;
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
