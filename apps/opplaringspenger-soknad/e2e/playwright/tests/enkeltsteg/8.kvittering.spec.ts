import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { sendInnSøknad } from '../../utfylling-utils/oppsummeringeStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.OPPSUMMERING);
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
});

test('Send inn søknad og kontroller kvittering', async ({ page }) => {
    await sendInnSøknad(page);
    await expect(page.getByRole('heading', { name: 'Vi har mottatt søknad om oppl' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Min side' })).toBeVisible();
});
