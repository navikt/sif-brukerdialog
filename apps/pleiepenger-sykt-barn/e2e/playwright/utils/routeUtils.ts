import { Page } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { setupMockRoutes } from './setupMockRoutes';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger';

const getRouteUrl = (stepId?: StepID): string => {
    return `${rootUrl}${stepId}`;
};

const gotoRoute = async (page: Page, step: StepID) => {
    await page.goto(getRouteUrl(step));
};

export const routeUtils = {
    gotoRoute,
    getRouteUrl,
    setupMockRoutes,
};
