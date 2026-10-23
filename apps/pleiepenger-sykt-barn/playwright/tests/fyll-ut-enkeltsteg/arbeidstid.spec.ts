import { expect, test } from '@playwright/test';

import { SøknadFormValues } from '../../../src/app/types/søknad-form-values/SøknadFormValues';
import { StepID } from '../../../src/app/types/StepID';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { testAccessibility } from '../../utils/testAccessibility';

const formValues: SøknadFormValues = {
    ...(mellomlagringMock.formValues as any),
    periodeFra: '2022-12-05',
    periodeTil: '2023-02-12',
};

test.beforeEach(async ({ page }) => {
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: { ...mellomlagringMock, formValues },
        lastStep: StepID.ARBEIDSSITUASJON,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/arbeidstid');
    await expect(page.getByRole('heading', { name: 'Jobb i søknadsperioden' })).toBeVisible();
    await page
        .getByRole('radiogroup', { name: 'Hvilken situasjon gjelder for deg' })
        .getByLabel('Jeg kombinerer delvis jobb med pleiepenger')
        .check();
});

test('Jobber likt hver uke - oppgir timer direkte', async ({ page }) => {
    await page.getByRole('radiogroup', { name: 'Jobber du like mye hver uke' }).getByLabel('Ja').check();

    await expect(page.getByText('I prosent')).toHaveCount(0);
    await page.getByLabel('Hvor mange timer jobber du hver uke').fill('10');
    await testAccessibility(page);

    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Omsorgstilbud i søknadsperioden' })).toBeVisible();
});

test('Jobber ulikt hver uke - oppgir timer per uke', async ({ page }) => {
    await page.getByRole('radiogroup', { name: 'Jobber du like mye hver uke' }).getByLabel('Nei, det varierer').check();

    await expect(page.getByLabel('Hvor mange timer jobber du hver uke')).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'Oppgi hvor mange timer du jobber' })).toBeVisible();
    await testAccessibility(page);
});
