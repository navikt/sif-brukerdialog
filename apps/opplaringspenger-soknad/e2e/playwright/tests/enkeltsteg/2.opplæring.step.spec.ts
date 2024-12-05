import { test, expect } from '@playwright/test';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { fyllUtOpplæringEnPeriode, fyllUtOpplæringFlerePerioder } from '../../utfylling-utils/2.opplæringStep';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.KURS, { kurs: undefined });
    await expect(page.getByRole('heading', { name: 'Om opplæringen' })).toBeVisible();
});

test.describe('Opplæring-steg', () => {
    test('Opplæring med én periode', async ({ page }) => {
        await fyllUtOpplæringEnPeriode(page);
    });
    test('Opplæring med flere perioder', async ({ page }) => {
        await fyllUtOpplæringFlerePerioder(page);
    });
});
