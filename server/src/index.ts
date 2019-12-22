import express from 'express';
import { IndexDatum } from './services/search-index';
import { SearchService } from './services/search.service';

const searchService = new SearchService();
const app = express();
const port = 8080;

/**
 * Index a site by url
 */
app.get('/index', (req: express.Request, res: express.Response) => {
    const url = req.query ? req.query.url : '';

    console.log(`[INDEX ] ${url}`);
    searchService.indexUrl(url).then((t: IndexDatum) => {
        res.send(t);
    });
});

/**
 * Clears the index
 */
app.get('/index-clear', (req: express.Request, res: express.Response) => {
    console.log('[CLEAR ]');
    searchService.clearIndex();
    res.send(true);
});

/**
 * Search indexed sites by a token
 */
app.get('/search', (req: express.Request, res: express.Response) => {
    const query = req.query ? req.query.query : '';

    console.log(`[SEARCH] ${query}`);
    const searchData = searchService.search(query);
    res.send(searchData);
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
