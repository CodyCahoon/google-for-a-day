export interface IndexDatum {
    pages: number;
    tokens: number;
}

export function index(url: string): Promise<IndexDatum> {
    return fetch(`index?url=${url}`)
        .then((resp: Response) => resp.json())
        .catch(() => Promise.resolve({ pages: 0, tokens: 0 }));
}
