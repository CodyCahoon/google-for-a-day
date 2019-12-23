import urlparser from 'url';

export namespace UrlUtil {
    const validUrlPrefixes = ['http', 'www'];

    export function getProtocolWithHostname(url: string): string | null {
        if (!url) {
            return null;
        }
        const parsedUrl = urlparser.parse(url);
        const { protocol, hostname, port } = parsedUrl;
        const baseUrl = `${protocol}//${hostname}`;
        if (port === null) {
            return baseUrl;
        }
        return `baseUrl:${port}`;
    }

    export function hasHostname(url: string): boolean {
        return urlparser.parse(url).hostname !== null;
    }

    export function isValidUrl(url: string): boolean {
        if (!url) {
            return false;
        }
        return validUrlPrefixes.some(p => url.startsWith(p));
    }

    export function cleanUrl(url: string): string {
        if (!url) {
            return null;
        }

        const urlLower = url.toLowerCase();
        if (urlLower.startsWith('www')) {
            return 'https://' + urlLower;
        }

        if (urlLower.startsWith('http')) {
            return urlLower;
        }
        return null;
    }
}
