import { test, expect } from '@playwright/test';
import { mellomlagringMock } from '../mock-data/mellomlagringMock';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { routeUtils } from '../utils/routeUtils';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { fyllUtOpplæringStep } from '../utfylling-utils/opplæringStep';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.KURS);
    await expect(page.getByRole('heading', { name: 'Om opplæringen' })).toBeVisible();
});

test('Fyll ut opplæring steg', async ({ page }) => {
    await fyllUtOpplæringStep(page);
});
