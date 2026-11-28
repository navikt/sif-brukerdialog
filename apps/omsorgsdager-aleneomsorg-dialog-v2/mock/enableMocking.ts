import { enableMocking as enableMockingBase } from '@sif/mock-utils';

export function enableMocking() {
    return enableMockingBase({
        loadWorker: () => import('./msw/browser'),
        mode: import.meta.env.MODE,
    });
}
