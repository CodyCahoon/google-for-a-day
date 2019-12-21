import { SearchService } from './search.service';

fdescribe('SearchService', () => {
    let service: SearchService;

    beforeEach(() => {
        service = new SearchService();
    });

    test('should exist', () => {
        expect(service).toBeDefined();
    });
});
