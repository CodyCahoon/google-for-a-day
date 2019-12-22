import express from 'express';
import { IndexDatum } from './services/search-index';
import { SearchService } from './services/search.service';

const searchService = new SearchService();
const app = express();
const port = 8080;

/**
 * Index a site by url
 */
app.post('/index', (req: express.Request, res: express.Response) => {
    const url = req.query ? req.query.url : '';

    console.log(`[INDEX ] ${url}`);
    searchService.indexUrl(url).then((t: IndexDatum) => {
        res.status(201);
        res.send(t);
    });
});

/**
 * Clears the index
 */
app.delete('/index', (req: express.Request, res: express.Response) => {
    console.log('[CLEAR ]');
    searchService.clearIndex();
    res.status(200);
    res.send(true);
});

/**
 * Search indexed sites by a token
 */
app.get('/search', (req: express.Request, res: express.Response) => {
    const query = req.query ? req.query.query : '';

    console.log(`[SEARCH] ${query}`);
    const searchData = searchService.search(query);
    const code = searchData.length > 0 ? 200 : 204;
    res.status(code);
    res.send(searchData);
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
