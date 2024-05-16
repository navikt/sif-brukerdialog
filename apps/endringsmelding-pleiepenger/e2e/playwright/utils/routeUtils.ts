/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/søknad/config/SøknadRoutes';
import { mellomlagring } from '../../mock-data/mellomlagring.mock';
import { setupMockRoutes } from './setupMockRoutes';
import { ScenarioType } from '../../../src/app/dev/scenarioer';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger';

const gotoRoute = async (page: Page, route: SøknadRoutes) => {
    await page.goto(getRouteUrl(route));
};

const getRouteUrl = (route: SøknadRoutes): string => {
    return `${rootUrl}${route}`;
};

const resumeFromRoute = async (
    page: Page,
    route: SøknadRoutes,
    scenario: ScenarioType = 'en-arbeidsgiver-en-periode',
    søknadsdata?: any,
) => {
    const mellomlagringToUse = {
        ...mellomlagring,
        søknadRoute: route,
        søknadsdata: {
            ...mellomlagring.søknadsdata,
            ...søknadsdata,
        },
    };

    await setupMockRoutes(page, scenario, {
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
