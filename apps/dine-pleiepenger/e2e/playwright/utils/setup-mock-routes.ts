import { ISODateToDate } from '@navikt/sif-common-utils';
import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { PleietrengendeMedSak } from '../../../src/server/api-models/PleietrengendeMedSakSchema';
import { defaultAppStatus } from '../../../src/pages/api/appStatus.api';

const sak: PleietrengendeMedSak = {
    pleietrengende: {
        fødselsnummer: '12345678910',
        fornavn: 'Barn',
        mellomnavn: null,
        etternavn: 'Nordmann',
        fødselsdato: '2019-10-03',
    },
    sak: {
        saksbehandlingsFrist: ISODateToDate('2021-01-01'),
    },
} as any;
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
            appStatus: defaultAppStatus,
            harSak: true,
            søker: søkerMockData as any,
            mellomlagring: {},
            innsendteSøknader: søknaderMockData as any,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
};
