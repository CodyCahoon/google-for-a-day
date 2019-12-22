export interface SearchDatum {
    occurrences: number;
    title: string;
    url: string;
}

export function search(query: string): Promise<SearchDatum[]> {
    return fetch(`search?query=${query}`, { method: 'get' })
        .then((resp: Response) => resp.json())
        .catch(() => Promise.resolve([]));
}
