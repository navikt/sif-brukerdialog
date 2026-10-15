import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { enableMocking } from '../enableMocking';

vi.mock('@sif/env', () => ({
    getMaybeEnv: () => 'development',
    getRequiredEnv: () => '/app',
}));

beforeEach(() => {
    // Unngår redirect fra '/' til PUBLIC_PATH, som jsdom ikke støtter
    history.replaceState(null, '', '/app');
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('enableMocking', () => {
    it('starter ikke worker når mode ikke er msw eller playwright', async () => {
        const start = vi.fn();
        await enableMocking({ loadWorker: async () => ({ worker: { start } }), mode: 'development' });
        expect(start).not.toHaveBeenCalled();
    });

    it('starter worker i msw-modus', async () => {
        const start = vi.fn().mockResolvedValue(undefined);
        await enableMocking({ loadWorker: async () => ({ worker: { start } }), mode: 'msw' });
        expect(start).toHaveBeenCalledWith({ onUnhandledRequest: 'warn' });
    });

    it('logger og resolver når worker.start avvises', async () => {
        const error = new Error('feilet');
        const start = vi.fn().mockRejectedValue(error);
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

        await expect(
            enableMocking({ loadWorker: async () => ({ worker: { start } }), mode: 'msw' }),
        ).resolves.toBeUndefined();

        expect(start).toHaveBeenCalledTimes(1);
        expect(consoleError).toHaveBeenCalledWith('Kunne ikke starte MSW', error);
    });
});
