import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { fyllUtDokumentasjon } from '../../utfylling-utils/6.dokumentasjonStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, SøknadRoutes.LEGEERKLÆRING, { legeerklæring: { vedlegg: [] } });
    await expect(page.getByRole('heading', { name: 'Dokumentasjon på nødvendig opplæring' })).toBeVisible();
});

test('Fyll ut dokumentasjon', async ({ page }) => {
    fyllUtDokumentasjon(page);
});
