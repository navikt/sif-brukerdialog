import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import {
    fyllUtOpplæringEnPeriode,
    fyllUtOpplæringToPerioder,
    kontrollerOpplæringEnPeriodeOppsummering,
    kontrollerOpplæringFlerePerioderOppsummering,
} from '../../utfylling-utils/2.opplæringStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.KURS, { kurs: undefined });
    await expect(page.getByRole('heading', { name: 'Om opplæringen' })).toBeVisible();
});

test.describe('Opplæring-steg', () => {
    test('Opplæring med én periode', async ({ page }) => {
        await fyllUtOpplæringEnPeriode(page);
        await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await kontrollerOpplæringEnPeriodeOppsummering(page);
    });
    test('Opplæring med flere perioder', async ({ page }) => {
        await fyllUtOpplæringToPerioder(page);
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await kontrollerOpplæringFlerePerioderOppsummering(page);
    });
});
