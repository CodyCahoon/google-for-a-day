## User Flow

1. [ ] User is able to toggle between indexing and searching

### Indexing

1. [ ] User is able to enter a URL to index
2. [ ] System index every word of content (ignore HTML tags) for a page
3. [ ] System stores the title of the page
4. [ ] System will index up to N levels deep (default = 3) using anchor tags
5. [ ] System prevents cyclical indexing (Page A -> B -> A)
6. [ ] User is able to see number of pages indexed and indexed words
7. [ ] User is able to clear out index

### Searching

1. [ ] User is able to enter a search terms (default to 1 term)
2. [ ] User displays all indexed pages which contains search term(s), include title, link to page, number of word occurences
3. [ ] System sorts pages by number of term occurences (highest first)
4. [ ] System does not return pages with 0 occurences

