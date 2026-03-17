export async function enableMocking() {
    const { worker } = await import('./msw/browser');

    return worker.start({
        onUnhandledRequest: 'warn',
        // serviceWorker: {
        //     url: '/sif-demo/mockServiceWorker.js',
        //     options: {
        //         scope: '/sif-demo/',
        //     },
        // },
    });
}
