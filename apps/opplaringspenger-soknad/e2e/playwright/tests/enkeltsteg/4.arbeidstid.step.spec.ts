import { test, expect } from '@playwright/test';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { fyllUtArbeidstid } from '../../utfylling-utils/4.arbeidstidStep';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSTID);
    await expect(page.getByRole('heading', { name: 'Jobb de dagene du søker for' })).toBeVisible();
});

test('Fyll ut arbeidstid steg', async ({ page }) => {
    await fyllUtArbeidstid(page);
});
