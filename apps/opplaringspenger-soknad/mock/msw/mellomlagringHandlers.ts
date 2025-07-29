import { http, HttpResponse } from 'msw';

export const getLocalStorageStore = (STORAGE_KEY: string) => ({
    get: () => {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    },

    set: (state: any) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },

    reset: () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    },
});

export const getMellomlagringHandlers = (STORAGE_KEY: string) => {
    const store = getLocalStorageStore(STORAGE_KEY);
    return [
        http.get('**/mellomlagring/OPPLARINGSPENGER', () => HttpResponse.json(store.get())),
        http.put('**/mellomlagring/OPPLARINGSPENGER', async ({ request }) => {
            const text = await request.text();
            const parsed = JSON.parse(text);
            store.set(parsed);
        }),
        http.post('**/mellomlagring/OPPLARINGSPENGER', async ({ request }) => {
            const text = await request.text();
            const parsed = JSON.parse(text);
            store.set(parsed);
        }),
        http.delete('**/mellomlagring/OPPLARINGSPENGER', async () => {
            store.reset();
        }),
    ];
};
