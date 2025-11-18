import { Page } from '@playwright/test';
import dayjs from 'dayjs';

import { InnsynsdataDto } from '../../src/server/dto-schemas/innsynsdataDtoSchema';
import { sakerMetadata, sakerMock } from '../mockdata/saker.mock';
import { søkerMockData } from '../mockdata/søker.mock';
import { setConsentCookie } from './setup-test-context';

const sak = sakerMock[0].sak;

const getSakResponseMedUtledetStatus = (status: any) => ({
    sak: {
        ...sak,
        utledetStatus: { ...sak.utledetStatus, ...status },
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
        const response: InnsynsdataDto = {
            sakerMetadata: sakerMetadata,
            harSak: true,
            søker: søkerMockData as any,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });

    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().add(1, 'day').toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
