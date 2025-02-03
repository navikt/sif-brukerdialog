/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../mock-data/mellomlagringMock';
import { setupMockRoutes } from './setupMockRoutes';
import { Søknadsdata } from '../../../src/app/types/søknadsdata/Søknadsdata';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/opplaringspenger/';

const gotoRoute = async (page: Page, route: SøknadRoutes) => {
    await page.goto(getRouteUrl(route));
};

const getRouteUrl = (route: SøknadRoutes): string => {
    return `${rootUrl}${route}`;
};

const resumeFromRoute = async (page: Page, route: SøknadRoutes, søknadsdata?: Partial<Søknadsdata>) => {
    const mellomlagringToUse = {
        ...mellomlagringMock,
        søknadRoute: route,
        søknadsdata: {
            ...mellomlagringMock.søknadsdata,
            ...søknadsdata,
        },
    };

    await setupMockRoutes(page, {
        mellomlagring: mellomlagringToUse,
    });

    await page.goto(getRouteUrl(SøknadRoutes.VELKOMMEN));
    await page.waitForURL(`**${route}`);
};

export const routeUtils = {
    gotoRoute,
    resumeFromRoute,
    getRouteUrl,
};
