import express from "express";
import { Parser } from "htmlparser2";
import fetch from "node-fetch";
import { Page } from "./interfaces/page.interface";
import { SearchIndex } from "./services/search-index";
import { ParserUtil } from "./utils/parser.util";

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
    .then(resp => resp.text())
    .then((data: string) => processResponse(data, url))
    .catch(e => {
      res.send({ messages: [e.message] });
    });

  function processResponse(data: string, url: string): void {
    const page = ParserUtil.getPage(data, url);
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
