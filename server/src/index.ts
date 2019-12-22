import express from "express";
import { Parser } from "htmlparser2";
import fetch, { FetchError, Response } from "node-fetch";
import { IndexDatum, SearchIndex } from "./services/search-index";
import { SearchService } from "./services/search.service";
import { ParseUtil } from "./utils/parse.util";

const searchService = new SearchService();
const app = express();
const port = 8080;

/**
 * Index a site by url
 */
app.get("/index", (req: express.Request, res: express.Response) => {
  const url = req?.query?.url;

  console.log(`[INDEX ] ${url}`);

  console.time("name");
  searchService.indexUrl(url).then((t: IndexDatum) => {
    console.log(t);
    console.timeEnd("name");
    res.send(t);
  });
});

/**
 * Clears the index
 */
app.get("/index-clear", (req: express.Request, res: express.Response) => {
  searchService.clearIndex();
  res.send(true);
});

/**
 * Search by a token
 */
app.get("/search", (req: express.Request, res: express.Response) => {
  const query = req?.query?.query || "";

  console.log(`[SEARCH] ${query}`);

  const searchData = searchService.search(query);
  res.send(searchData);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
