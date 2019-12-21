import { SanitizeUtil } from "./sanitize.util";

describe("SanitizeUtil", () => {
  describe("sanitize", () => {
    const sanitize = (str: string) => SanitizeUtil.sanitize(str);

    it("should return null when the string is empty", () => {
      expect(sanitize("")).toBeNull();
    });

    it("should return null when the string is undefined", () => {
      expect(sanitize(undefined)).toBeNull();
    });

    it("should return null when the string is null", () => {
      expect(sanitize(null)).toBeNull();
    });

    it("should trim any whitespace", () => {
      expect(sanitize(" test ")).toBe("test");
    });

    it("should lowercase any letter", () => {
      expect(sanitize("AbCdE")).toBe("abcde");
    });
  });
});
