export async function enableMocking() {
    if (import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./msw/browser');
    if (__IS_GITHUB_PAGES__) {
        return worker.start({
            serviceWorker: {
                url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            },
        });
    }
    return worker.start();
}
