import { SearchIndex } from './search-index';

export class SearchService {
    private searchIndex = new SearchIndex();
    private tokenizer = new Tokenizer();
    private sanitizer = new Sanitizer();

    constructor() {}
}

export class Tokenizer {
    public tokenize(str: string): string[] {
        return str.split(' ').filter(word => !!word);
    }
}

export class Sanitizer {
    public sanitize(word: string): string {
        return word?.toLowerCase().trim();
    }
}
