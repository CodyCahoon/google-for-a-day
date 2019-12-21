import { SanitizeUtil } from "./sanitize.util";

export namespace TokenUtil {
  const isNotEmpty = (text: string) => !!text;
  const isWord = (text: string): boolean =>
    text ? !!text.match(/^[a-zA-Z0-9']*$/) : false;

  export function tokenize(str: string): string[] {
    if (!str) {
      return [];
    }
    return str
      .trim()
      .split(" ")
      .map(SanitizeUtil.sanitize)
      .filter(isNotEmpty)
      .filter(isWord);
  }
}
