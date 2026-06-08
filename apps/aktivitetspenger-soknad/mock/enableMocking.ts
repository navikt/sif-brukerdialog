import { enableMocking as enableMockingBase } from '@sif/api/mock-utils';

export function enableMocking() {
    return enableMockingBase({
        loadWorker: () => import('./msw/browser'),
        mode: import.meta.env.MODE,
    });
}
