import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.TIDSROM,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/arbeidstid');
    await expect(page.getByRole('heading', { name: 'Jobb i søknadsperioden' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Omsorgstilbud i søknadsperioden' })).toBeVisible();
});

test('Fyll ut jobb i søknadsperioden', async ({ page }) => {
    await page.getByText('Jeg kombinerer delvis jobb').click();
    await page.getByLabel('Ja').check();
    await page.getByText('I prosent').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('10');
    await page.getByTestId('prosent-verdi').press('Tab');
    await page.getByText('I timer').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('5');
    await page.getByTestId('timer-verdi').press('Tab');
    await page.getByText('Nei, det varierer').click();
    await page.getByLabel('Uke 102.01.2023 -').click();
    await page.getByLabel('Uke 102.01.2023 -').fill('2');
    await page.getByLabel('Uke 209.01.2023 -').click();
    await page.getByLabel('Uke 209.01.2023 -').fill('3');
    await page.getByLabel('Uke 209.01.2023 -').press('Tab');
    await page.getByText('Jeg jobber ikke').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
});
