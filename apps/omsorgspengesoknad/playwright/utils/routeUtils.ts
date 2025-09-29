/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '@playwright/test';
import { SøknadRoutes } from '../../src/app/types/SøknadRoutes';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/';

const gotoRoute = async (page: Page, route: SøknadRoutes) => {
    await page.goto(getRouteUrl(route));
};

const getRouteUrl = (route: SøknadRoutes): string => {
    return `${rootUrl}${route}`;
};

export const routeUtils = {
    gotoRoute,
    getRouteUrl,
};
