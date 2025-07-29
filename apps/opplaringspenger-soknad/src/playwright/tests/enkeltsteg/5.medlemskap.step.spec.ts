import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { fyllUtMedlemskap } from '../../utfylling-utils/5.medlemskapStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.MEDLEMSKAP, { medlemskap: undefined });
    await expect(page.getByRole('heading', { name: 'Medlemskap i folketrygden' })).toBeVisible();
});

test('Fyll ut medlemskap', async ({ page }) => {
    await fyllUtMedlemskap(page);
});
