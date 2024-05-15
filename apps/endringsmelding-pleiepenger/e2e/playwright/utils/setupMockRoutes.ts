import { Page } from '@playwright/test';
import { enArbeidsgiverMock } from '../../mock-data/enArbeidsgiverMock';
import { enSakEnArbeidsgiverMock } from '../../mock-data/enSakEnArbeidsgiverMock';
import { søkerMock } from '../../mock-data/søkerMock';

export const setupMockRoutes = async (page: Page, props?: { mellomlagring: any }) => {
    await page.route('**hotjar**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://amplitude.nav.no/collect-auto', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**collect**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('**/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({ status: 200, body: JSON.stringify(props?.mellomlagring || {}) });
            return;
        }
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.route('**/oppslag/soker?ytelse=endringsmelding-pleiepenger', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(søkerMock) });
    });
    await page.route('**/oppslag/arbeidsgiver**', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(enArbeidsgiverMock) });
    });
    await page.route('**/api/innsyn/sak', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(enSakEnArbeidsgiverMock) });
    });
};
