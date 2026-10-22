// @vitest-environment node

import { setupServer } from 'msw/node';
import { afterAll, beforeAll, expect, it, vi } from 'vitest';

import { getDevAppSettings } from '../devAppSettings';

const baseUrl = `http://localhost${getDevAppSettings().K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}`;
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

const upload = async (content: string) => {
    const formData = new FormData();
    formData.set('vedlegg', new File([content], 'vedlegg.txt', { type: 'text/plain' }));
    const response = await fetch(`${baseUrl}/vedlegg`, { method: 'POST', body: formData });
    expect(response.status).toBe(200);
    const location = response.headers.get('Location');
    expect(location).toBeTruthy();
    return new URL(location!, baseUrl);
};

it('holder gamle vedlegg manglende og gir erstatninger nye ID-er etter reload', async () => {
    const { getHandlers } = await import('./handlers');
    server.resetHandlers(...getHandlers());
    const originalUrl = await upload('Original');
    const originalId = originalUrl.pathname.split('/').at(-1);

    vi.resetModules();
    const reloaded = await import('./handlers');
    server.resetHandlers(...reloaded.getHandlers());

    expect((await fetch(originalUrl)).status).toBe(404);
    const replacementUrl = await upload('Erstatning');
    const replacementId = replacementUrl.pathname.split('/').at(-1);

    expect(replacementId).not.toBe(originalId);
    const response = await fetch(`${baseUrl}/vedlegg/eksisterer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vedleggIder: [originalId, replacementId] }),
    });
    expect(await response.json()).toEqual([
        { vedleggId: originalId, finnes: false },
        { vedleggId: replacementId, finnes: true },
    ]);
    expect((await fetch(originalUrl)).status).toBe(404);
    expect(await (await fetch(replacementUrl)).text()).toBe('Erstatning');
});
