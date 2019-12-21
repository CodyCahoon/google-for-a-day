import express from "express";
import { Parser } from "htmlparser2";
import fetch, { FetchError, Response } from "node-fetch";
import { SearchIndex } from "./services/search-index";
import { ParseUtil } from "./utils/parse.util";

const searchIndex = new SearchIndex();
const app = express();
const port = 8080;

/**
 * Index a site by url
 */
app.get("/index", (req: express.Request, res: express.Response) => {
  const url = req?.query?.url;

  console.log(`[INDEX ] ${url}`);

  fetch(url)
    .then((resp: Response) => resp.text())
    .then((data: string) => processResponse(data, url))
    .catch((e: FetchError) => {
      res.send({ messages: [e.errno] });
    });

  function processResponse(data: string, url: string): void {
    const page = ParseUtil.getPage(data, url);
    const indexDatum = searchIndex.indexPage(page);
    res.send({ indexDatum });
  }
});

/**
 * Search by a token
 */
app.get("/search", (req: express.Request, res: express.Response) => {
  const query = req?.query?.query || "";

  console.log(`[SEARCH] ${query}`);

  const searchData = searchIndex.search(query);
  res.send(searchData);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
