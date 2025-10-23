import { Innsynsdata } from '../../../src/types/InnsynData';
import { sakerMock } from '../mockdata/saker.mock';
import { søkerMockData } from '../mockdata/søker.mock';

export const setupMockRoutes = async (page: any) => {
    await page.route('https://login.nav.no/**', async (route: any) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('*.api.sanity.io/**', async (route: any) => {
        await route.fulfill({ status: 200 });
    });
    await page.route('https://www.nav.no/person/nav-dekoratoren-api/auth', async (route: any) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('**/innsynsdata', async (route: any) => {
        const response: Innsynsdata = {
            saker: sakerMock,
            harSak: true,
            søker: søkerMockData as any,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
