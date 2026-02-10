export async function enableMocking() {
    if (import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./browser');

    if (__IS_VEILEDER_DEMO__ && __IS_GITHUB_PAGES__) {
        return worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
                options: {
                    scope: import.meta.env.BASE_URL,
                },
            },
        });
    }

    return worker.start({ onUnhandledRequest: 'bypass' });
}
