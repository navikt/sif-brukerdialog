export async function enableMocking() {
    const { worker } = await import('./msw/browser');

    return worker.start({
        onUnhandledRequest: 'warn',
    });
}
