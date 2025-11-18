import { Page } from '@playwright/test';
import dayjs from 'dayjs';

import { enSakMockData } from '../mockdata/enSakMockData';
import { toSakerMockData } from '../mockdata/toSakerMockData';
import { setConsentCookie } from './setup-test-context';

const getSakResponseMedUtledetStatus = (sak: any, status: any) => ({
    sak: {
        ...sak,
        utledetStatus: { ...sak.utledetStatus, ...status },
    },
    inntektsmeldinger: [],
});

export enum MockScenario {
    'EN_SAK' = 'EN_SAK',
    'TO_SAKER' = 'TO_SAKER',
}

const getMockData = (scenario?: MockScenario) => {
    return scenario === MockScenario.TO_SAKER ? toSakerMockData : enSakMockData;
};

export const setupMockRoutes = async (page: Page, scenario?: MockScenario) => {
    const mockData = getMockData(scenario);

    // Sett consent-cookie for å unngå samtykke-banner
    await setConsentCookie(page);

    await page.route('*', async (route: any) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('**/innsynsdata', async (route: any) => {
        const response = {
            sakerMetadata: mockData.sakerMetadata,
            harSak: true,
            søker: mockData.søker,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });

    await page.route('**/api/sak/*', async (route) => {
        const url = new URL(route.request().url());
        const sakId = url.pathname.split('/').pop();
        const sak = mockData.saker.find((s) => s.saksnummer === sakId);

        const response = getSakResponseMedUtledetStatus(sak, {
            saksbehandlingsFrist: dayjs().add(1, 'day').toDate(),
        });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });

    await page.route('**/api/saksbehandlingstid', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(enSakMockData.saksbehandlingstid) });
    });
};
