import { test, expect } from '@playwright/test';
import { StepId } from '../../../../src/app/types/StepId';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { fyllUtBarnStep } from '../../utfylling-utils/1.barnStep';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
        lastStep: StepId.OM_BARNET,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.BARN);
    await expect(page.getByRole('heading', { name: 'Om barnet' })).toBeVisible();
});

test('Fyll ut barn-steg', async ({ page }) => {
    await fyllUtBarnStep(page);
});
