import { UrlUtil } from '../utils/url.util';
import { Page } from '../interfaces/page.interface';
import { TokenUtil } from '../utils/token.util';
import { Parser } from 'htmlparser2';

export class ParseService {
    public parseData(data: string, url: string): Page {
        let title: string = null;
        const tags: string[] = [];
        const tokens: string[] = [];
        const hrefs = new Set<string>();

        let isInBody = false;

        const onopentag = (tag: string, attributes: { [key: string]: any } = {}) => {
            // Title & Tokens
            tags.push(tag);

            // Tokens
            if (tag === 'body') {
                isInBody = true;
            }

            // Hrefs
            if (tag === 'a') {
                const href = this.cleanHref(attributes.href);
                if (this.isValidHref(href)) {
                    hrefs.add(href);
                }
            }
        };

        const ontext = (text: string) => {
            // Title
            const currentTag = tags[tags.length - 1];
            if (currentTag === 'title' && tags.includes('head')) {
                title = text;
            }

            // Tokens
            if (isInBody) {
                tokens.push(...TokenUtil.tokenize(text));
            }
        };

        const onclosetag = (tag: string) => {
            // Title & Tokens
            tags.pop();

            // Tokens
            if (tag === 'body') {
                isInBody = false;
            }
        };

        const parser = new Parser(
            {
                onclosetag,
                onopentag,
                ontext,
            },
            { decodeEntities: true },
        );
        parser.write(this.cleanData(data));
        parser.end();

        const hrefPrefix = UrlUtil.getProtocolWithHostname(url);

        const externalUrls = Array.from(hrefs).map((href: string) => {
            const externalUrl = UrlUtil.hasHostname(href) ? href : hrefPrefix + href;
            return UrlUtil.cleanUrl(externalUrl);
        });

        return {
            externalUrls,
            title,
            tokens,
            url,
        };
    }

    private cleanData(data: string): string {
        return data.replace(/<script.+?<\/script>/gm, '').replace(/<style.+?<\/style>/gm, '');
    }

    private cleanHref(href: string): string | null {
        if (!href) {
            return null;
        }

        const cleanedHref = href.trim().toLowerCase();
        const queryParamIndex = cleanedHref.indexOf('?');
        return queryParamIndex === -1 ? cleanedHref : cleanedHref.substring(0, queryParamIndex);
    }

    private isValidHref(href: string): boolean {
        if (!href) {
            return false;
        }
        return ['http', '/'].some(p => href.startsWith(p));
    }
}
