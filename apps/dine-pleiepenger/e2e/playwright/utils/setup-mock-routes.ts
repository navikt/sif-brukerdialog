import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';

export const setupMockRoutes = async (page: any) => {
    await page.route('https://login.nav.no/**', async (route) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            svarfrist: undefined,
            søker: søkerMockData as any,
            mellomlagring: {},
            søknader: søknaderMockData as any,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
