import { test, expect } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../setup/routeUtils';
import { getSøknadsperiode } from '../setup';
import { setNow } from '../setup/setNow';
import { setupMockApi } from '../setup/setupMockApi';

export const invalidParameterResponse = {
    status: 400,
    body: {
        type: '/problem-details/invalid-request-parameters',
        title: 'invalid-request-parameters',
        status: 400,
        detail: 'Requesten inneholder ugyldige paramtere.',
        instance: 'about:blank',
        invalid_parameters: [
            'frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR',
            'frilans.startdato kan ikke være null dersom frilans.type er HONORAR',
            'frilans.jobberFortsattSomFrilans kan ikke være null dersom frilans.type er HONORAR',
        ],
    },
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockApi(page);
});

test('Feilmelding vises når innsending feiler', async ({ page }) => {
    await routeUtils.startOnStep(page, StepID.SUMMARY, getSøknadsperiode());
    await page.route('**/innsending', async (route) => {
        await route.fulfill({ status: 400, body: JSON.stringify(invalidParameterResponse.body) });
    });
    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',
        )
        .check();

    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByText('Oops, noe gikk galt').isVisible()).toBeTruthy();
    await expect(
        page.getByText('frilans.misterHonorar kan ikke være null dersom frilans.type er HONORAR').isVisible(),
    ).toBeTruthy();
});
