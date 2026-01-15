import { expect, test } from '@playwright/test';

import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import {
    fyllUtOpplæringEnkeltdag,
    fyllUtOpplæringEnPeriode,
    fyllUtOpplæringFlereEnkeltdager,
    fyllUtOpplæringToPerioder,
    kontrollerOpplæringEnEnkeltdagOppsummering,
    kontrollerOpplæringEnPeriodeOppsummering,
    kontrollerOpplæringFlereEnkeltdagerOppsummering,
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
    test('Opplæring med én enkeltdag', async ({ page }) => {
        await fyllUtOpplæringEnkeltdag(page);
        await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await kontrollerOpplæringEnEnkeltdagOppsummering(page);
    });
    test('Opplæring med flere enkeltdager', async ({ page }) => {
        await fyllUtOpplæringFlereEnkeltdager(page);
        await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByTestId('typedFormikForm-submitButton').click();
        await kontrollerOpplæringFlereEnkeltdagerOppsummering(page);
    });
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
