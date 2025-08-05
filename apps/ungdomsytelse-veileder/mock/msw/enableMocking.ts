export async function enableMocking() {
    if (import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./browser');
    return worker.start({ onUnhandledRequest: 'bypass' });
}
