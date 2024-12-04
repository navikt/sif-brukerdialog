import { test, expect } from '@playwright/test';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { fyllUtArbeidssituasjonStep } from '../../utfylling-utils/3.arbeidssituasjonStep';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSSITUASJON);
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjon' })).toBeVisible();
});

test('Fyll ut arbeidssituasjon steg', async ({ page }) => {
    await fyllUtArbeidssituasjonStep(page);
});
