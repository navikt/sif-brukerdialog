import { BrowserContext, Page } from '@playwright/test';

import { store } from '../../mock/state/store';
import { mockUtils } from '../../mock/utils/mockUtils';

const setupNavnoConsentCookieForPlaywrightTests = async (context: BrowserContext) => {
    return await context.addCookies([
        {
            name: 'navno-consent',

            value: '{%22consent%22:{%22analytics%22:false%2C%22surveys%22:false}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222025-01-28T15:46:10.985Z%22%2C%22updatedAt%22:%222025-01-29T07:07:24.760Z%22%2C%22version%22:1}}',
            domain: 'localhost',
            path: '/',
            expires: -1, // Session cookie
            httpOnly: false,
            secure: false,
            sameSite: 'Lax',
        },
    ]);
};

export async function registerMockRoutes(page: Page, context: BrowserContext) {
    await setupNavnoConsentCookieForPlaywrightTests(context);

    await page.route('**/deltaker/hent-kontonummer', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ harKontonummer: true, kontonummer: '12345678901' }),
        });
    });

    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(store.get().søker),
        });
    });

    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(store.get().barn),
        });
    });

    await page.route('**/oppslag/arbeidsgiver', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(store.get().arbeidsgiver),
        });
    });

    await page.route('**/deltakelse/register/hent/alle', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(store.get().deltakelser),
        });
    });

    await page.route(/\/oppgave\/hent\/alle\?ytelsetype=UNGDOMSYTELSE/, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(store.get().oppgaver),
        });
    });

    await page.route('**/mellomlagring/**', async (route) => {
        const method = route.request().method();
        if (method === 'GET') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(store.get().mellomlagring ?? {}),
            });
        } else if (method === 'POST' || method === 'PUT') {
            const text = await route.request().postData();
            const data = text ? JSON.parse(text) : {};
            store.update({ mellomlagring: data });
            await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({}) });
        } else if (method === 'DELETE') {
            store.update({ mellomlagring: undefined });
            await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({}) });
        } else {
            await route.fulfill({ status: 200 });
        }
    });

    await page.route('**/ung-deltakelse-opplyser/deltakelse/register/:id/marker-har-sokt', async (route) => {
        await route.fulfill({ status: 500 });
    });

    await page.route('**/ungdomsytelse/soknad/innsending', async (route) => {
        mockUtils.setDeltakelseSøktFor();
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({}),
        });
    });

    await page.route('**/ungdomsytelse/oppgavebekreftelse/innsending', async (route) => {
        const text = await route.request().postData();
        const parsed = JSON.parse(text || '{}');
        mockUtils.setOppgavebekreftelse(parsed.oppgave.oppgaveReferanse, parsed);
        await route.fulfill({ status: 200 });
    });

    await page.route('**/ungdomsytelse/inntektsrapportering/innsending', async (route) => {
        const text = await route.request().postData();
        const parsed = JSON.parse(text || '{}');
        mockUtils.setRapportertInntekt(parsed.oppgaveReferanse, parsed);
        await route.fulfill({
            status: 200,
        });
    });
}
