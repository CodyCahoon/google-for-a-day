import urlparser from "url";

export namespace UrlUtil {
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
}
