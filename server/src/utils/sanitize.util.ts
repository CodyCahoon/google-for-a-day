export namespace SanitizeUtil {
  export function sanitize(str: string): string | null {
    return str ? str.trim().toLocaleLowerCase() : null;
  }
}
