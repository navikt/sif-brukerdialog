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

const resumeFromStep = async (page: Page, step?: StepID, søknadsdata?: any) => {
    await setupMockRoutes(page, {
        mellomlagring: {},
    });

    await page.goto(getRouteUrl(step));
    await page.waitForURL(`**${step}`);
};

export const routeUtils = {
    gotoRoute,
    resumeFromStep,
    getRouteUrl,
    setupMockRoutes,
};
