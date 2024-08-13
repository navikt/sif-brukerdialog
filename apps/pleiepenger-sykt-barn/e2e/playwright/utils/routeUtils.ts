import { Page, expect } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { setupMockRoutes } from './setupMockRoutes';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger';

const getRouteUrl = (stepId?: StepID): string => {
    return `${rootUrl}${stepId}`;
};

const gotoRoute = async (page: Page, step: StepID) => {
    await page.goto(getRouteUrl(step));
};

const gåTilOppsummeringFraArbeidssituasjon = async (page: Page, harArbeidsaktivitet = true) => {
    if (harArbeidsaktivitet) {
        await page.getByRole('button', { name: 'Neste steg' }).click();
    }
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
};
const gåTilOppsummeringFraJobbISøknadsperioden = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
};

export const routeUtils = {
    gotoRoute,
    getRouteUrl,
    setupMockRoutes,
    gåTilOppsummeringFraArbeidssituasjon,
    gåTilOppsummeringFraJobbISøknadsperioden,
};
