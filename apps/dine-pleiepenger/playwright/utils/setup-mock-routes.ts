import { Page } from '@playwright/test';
import dayjs from 'dayjs';

import { enSakMockData } from '../mockdata/enSakMockData';
import { ingenSakerMockData } from '../mockdata/ingenSakerMockData';
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
    'INGEN_SAK_ELLER_SOKNADER' = 'INGEN_SAK_ELLER_SOKNADER',
    'KUN_SØKNADER' = 'KUN_SØKNADER',
}

const getMockData = (scenario: MockScenario) => {
    switch (scenario) {
        case MockScenario.INGEN_SAK_ELLER_SOKNADER:
            return {
                søker: ingenSakerMockData.søker,
                soknader: [],
                sakerMetadata: [],
                saker: [],
            };
        case MockScenario.KUN_SØKNADER:
            return {
                søker: ingenSakerMockData.søker,
                soknader: ingenSakerMockData.soknader,
                sakerMetadata: [],
                saker: [],
            };
        case MockScenario.TO_SAKER:
            return toSakerMockData;
        case MockScenario.EN_SAK:
            return enSakMockData;
    }
};

export const setupMockRoutes = async (page: Page, scenario: MockScenario = MockScenario.EN_SAK) => {
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

    await page.route('**/api/soknader', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify((mockData as any).soknader || []) });
    });

    await page.route('**/api/saksbehandlingstid', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(enSakMockData.saksbehandlingstid) });
    });
};
