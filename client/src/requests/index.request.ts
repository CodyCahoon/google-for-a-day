export interface IndexDatum {
    pages: number;
    tokens: number;
}

export function index(url: string): Promise<IndexDatum> {
    return fetch(`index?url=${url}`, { method: 'post' })
        .then((resp: Response) => resp.json())
        .catch(() => Promise.resolve({ pages: 0, tokens: 0 }));
}

export function clearIndex(): Promise<string> {
    return fetch('index', { method: 'delete' })
        .then(() => 'Index successfully cleared.')
        .catch(() => Promise.resolve('Error clearing index.'));
}
