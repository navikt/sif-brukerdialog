import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import {
    fyllUtAnnetBarn,
    fyllUtRegistrertBarn,
    kontrollerAnnetBarnOppsummering,
} from '../../utfylling-utils/1.barnStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.BARN);
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
});

test.describe('Barn-steg', () => {
    test('Fyll ut registrert barn', async ({ page }) => {
        await fyllUtRegistrertBarn(page);
    });
    test('Fyll ut annet barn', async ({ page }) => {
        await fyllUtAnnetBarn(page);
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await kontrollerAnnetBarnOppsummering(page);
    });
});
