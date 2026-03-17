export async function enableMocking() {
    const { worker } = await import('./msw/browser');

    return worker.start({
        onUnhandledRequest: 'warn',
        // serviceWorker: {
        //     url: '/omsorgspengesoknad-v2/mockServiceWorker.js',
        //     options: {
        //         scope: '/omsorgspengesoknad-v2/',
        //     },
        // },
    });
}
