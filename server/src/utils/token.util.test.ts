import { TokenUtil } from "./token.util";

describe("TokenUtil", () => {
  describe("tokenize", () => {
    const tokenize = (str: string) => TokenUtil.tokenize(str);

    it("should return an empty array when the string is empty", () => {
      expect(tokenize("")).toEqual([]);
    });

    it("should return an empty array when the string is undefined", () => {
      expect(tokenize(undefined)).toEqual([]);
    });

    it("should return an empty array when the string is null", () => {
      expect(tokenize(null)).toEqual([]);
    });

    it("should filter out non-words", () => {
      expect(tokenize(" apples <> bananas :0)")).toEqual(["apples", "bananas"]);
    });
  });
});
