## User Flow

1. [x] User is able to toggle between indexing and searching

### Indexing

1. [x] User is able to enter a URL to index
2. [x] System index every word of content (ignore HTML tags) for a page
3. [x] System stores the title of the page
4. [x] System will index up to N levels deep (default = 3) using anchor tags
5. [x] System prevents cyclical indexing (Page A -> B -> A)
6. [x] User is able to see number of pages indexed and indexed words
7. [x] User is able to clear out index

### Searching

1. [x] User is able to enter a search terms (default to 1 term)
2. [x] User displays all indexed pages which contains search term(s), include title, link to page, number of word occurrences
3. [x] System sorts pages by number of term occurrences (highest first)
4. [x] System does not return pages with 0 occurrences
