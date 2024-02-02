import { ISODateToDate } from '@navikt/sif-common-utils';
import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { Sak } from '../../../src/types/Sak';

const sak: Sak = {
    saksbehandlingsFrist: ISODateToDate('2021-01-01'),
};
export const setupMockRoutes = async (page: any) => {
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('*.api.sanity.io/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            saker: [sak],
            harSak: true,
            søker: søkerMockData as any,
            mellomlagring: {},
            søknader: søknaderMockData as any,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
