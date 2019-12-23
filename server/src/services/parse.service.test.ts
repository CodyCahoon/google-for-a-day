import { ParseService } from './parse.service';

describe('ParseUtil', () => {
    let service: ParseService;

    beforeEach(() => {
        service = new ParseService();
    });

    const parse = (data: string, url: string) => service.parseData(data, url);

    it('should get the title of the page', () => {
        const data = '<html><head><title>Test</title></head></html>';
        const page = parse(data, 'http://www.test.com');

        expect(page.title).toBe('Test');
    });

    it('should return null when the title does not exist', () => {
        const data = '<html><head></head></html>';
        const page = parse(data, 'http://www.test.com');

        expect(page.title).toBeNull();
    });
    it('should not return any external urls when there is not a body tag', () => {
        const data = '<html><head><title>Test</title></head></html>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual([]);
    });

    it('should ignore hrefs when they start with "#"', () => {
        const data = '<body><a href="#">Link!</a></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual([]);
    });

    it('should ignore hrefs when they start with "mailto:"', () => {
        const data = '<body><a href="mailto:test@pinpoint.com">Snail Mail</a></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual([]);
    });

    it('should ignore hrefs when they start with "tel:"', () => {
        const data = '<body><a href="tel:+1.867.5309">HMU</a></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual([]);
    });

    it('should return external urls when they are absolute', () => {
        const data = '<body><a href="https://www.google.com">Link!</a></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual(['https://www.google.com']);
    });

    it('should return external urls with the domain prefixed when they are relative', () => {
        const data = '<body><a href="/testing">Link!</a></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.externalUrls).toEqual(['http://www.test.com/testing']);
    });
    it('should return an empty array when there is not a body tag', () => {
        const data = '<head><title>Should ignore!</title></head>';
        const page = parse(data, 'http://www.test.com');

        expect(page.tokens).toEqual([]);
    });

    it('should ignore text inside of script tags', () => {
        const data = '<body><script>Should be ignored</script></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.tokens).toEqual([]);
    });

    it('should ignore text inside of style tags', () => {
        const data = '<body><style>.nav { color: red; }</style></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.tokens).toEqual([]);
    });

    it('should return a list of tokens inside of the body tag', () => {
        const data = '<body><h1>Test</h1><span>This word should be Indexed</span></body>';
        const page = parse(data, 'http://www.test.com');

        expect(page.tokens).toEqual(['test', 'this', 'word', 'should', 'be', 'indexed']);
    });
});
