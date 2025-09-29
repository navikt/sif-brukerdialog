import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { mellomlagringMock } from '../../mock-data/mellomlagringMock';
import { fyllUtDokumentasjon } from '../../utfylling-utils/6.dokumentasjonStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';
import { setupMockRoutes } from '../../utils/setupMockRoutes';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
    });
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.LEGEERKLÆRING, {
        legeerklæring: { vedlegg: [], skalEttersendeVedlegg: false },
    });
    await expect(page.getByRole('heading', { name: 'Dokumentasjon på nødvendig opplæring' })).toBeVisible();
});

test('Fyll ut dokumentasjon', async ({ page }) => {
    await fyllUtDokumentasjon(page);
});
