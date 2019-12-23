import { Parser } from 'htmlparser2';
import { Page } from '../interfaces/page.interface';
import { TokenUtil } from './token.util';
import { UrlUtil } from './url.util';

export namespace ParseUtil {
    function getTitle(data: string): string | null {
        let title: string = null;
        const tags: string[] = [];

        const onopentag = (tag: string) => tags.push(tag);
        const onclosetag = () => tags.pop();

        const ontext = (text: string) => {
            if (!!title) {
                return;
            }

            const currentTag = tags[tags.length - 1];
            if (currentTag === 'title' && tags.includes('head')) {
                title = text;
            }
        };

        parse(data, { onclosetag, onopentag, ontext });
        return title;
    }

    function getTokens(data: string): string[] {
        const tokens: string[] = [];
        const tags: string[] = [];
        const tagsToIgnore = ['script', 'style'];

        const onopentag = (tag: string) => tags.push(tag);
        const onclosetag = () => tags.pop();

        const ontext = (text: string) => {
            if (!tags.includes('body')) {
                return;
            }

            for (let i = 0; i < tagsToIgnore.length; i++) {
                if (tags.includes(tagsToIgnore[i])) {
                    return;
                }
            }

            tokens.push(...TokenUtil.tokenize(text));
        };

        parse(data, { onclosetag, onopentag, ontext });
        return tokens;
    }

    const isNotEmpty = (href: string) => !!href;
    const isNotMailTo = (href: string) => !href.startsWith('mailto:');
    const isNotTelephone = (href: string) => !href.startsWith('tel:');
    const isNotIdHref = (href: string) => !href.startsWith('#');
    const removeQueryParams = (href: string) => {
        const queryParamIndex = href.indexOf('?');
        return queryParamIndex === -1 ? href : href.substring(0, queryParamIndex);
    };

    function getHrefs(data: string): string[] {
        const hrefs = new Set<string>();

        const onopentag = (tag: string, attributes: { [key: string]: any }) => {
            if (tag !== 'a') {
                return;
            }

            const href = attributes.href;
            if (!href) {
                return;
            }

            hrefs.add(removeQueryParams(href.trim().toLowerCase()));
        };

        parse(data, { onopentag });
        return Array.from(hrefs)
            .filter(isNotEmpty)
            .filter(isNotIdHref)
            .filter(isNotMailTo)
            .filter(isNotTelephone);
    }

    function parse(data: string, config: ParserConfig): void {
        const parser = new Parser(config, { decodeEntities: true });
        parser.write(data);
        parser.end();
    }

    export function getPage(data: string, url: string): Page {
        const hrefPrefix = UrlUtil.getProtocolWithHostname(url);
        const externalUrls = getHrefs(data).map((href: string) =>
            UrlUtil.hasHostname(href) ? href : hrefPrefix + href,
        );

        return {
            externalUrls,
            url,
            title: getTitle(data),
            tokens: getTokens(data),
        };
    }
}

interface ParserConfig {
    onopentag?: (tag: string, attributes: { [key: string]: any }) => void;
    ontext?: (text: string) => void;
    onclosetag?: (tag: string) => void;
}
