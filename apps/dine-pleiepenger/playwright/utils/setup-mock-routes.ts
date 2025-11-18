import { Page } from '@playwright/test';
import dayjs from 'dayjs';

import { enSakMockData } from '../mockdata/enSakMockData';
import { setConsentCookie } from './setup-test-context';

const getSakResponseMedUtledetStatus = (status: any) => ({
    sak: {
        ...enSakMockData.sak,
        utledetStatus: { ...enSakMockData.sak.utledetStatus, ...status },
    },
    inntektsmeldinger: [],
});

export const setupMockRoutes = async (page: Page) => {
    // Sett consent-cookie for å unngå samtykke-banner
    await setConsentCookie(page);

    await page.route('*', async (route: any) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('**/innsynsdata', async (route: any) => {
        const response = {
            sakerMetadata: enSakMockData.sakerMetadata,
            harSak: true,
            søker: enSakMockData.søker,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });

    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().add(1, 'day').toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
