export async function enableMocking() {
    if (import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./browser');
    try {
        if (typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__) {
            return worker.start({
                serviceWorker: {
                    url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
                },
            });
        }
    } catch {
        // __IS_GITHUB_PAGES__ is not defined, continue with default
    }
    return worker.start();
}
