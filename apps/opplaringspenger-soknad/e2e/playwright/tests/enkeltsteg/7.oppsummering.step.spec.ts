import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { kontrollerOppsummering } from '../../utfylling-utils/oppsummeringeStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.OPPSUMMERING);
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
});

test('Kontroller oppsummering', async ({ page }) => {
    await kontrollerOppsummering(page);
});
