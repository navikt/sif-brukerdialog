import { test } from '@playwright/test';

import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { utfyllingUtils } from '../utils/utfyllingUtils';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test.describe('Fyller ut søknad', () => {
    test('Fyller ut søknad enkelt', async ({ page }) => {
        await utfyllingUtils.startSøknad(page);
        await utfyllingUtils.fyllUtDineBarnSteg(page);
        await utfyllingUtils.fyllUtDinArbeidssituasjonSteg(page);
        await utfyllingUtils.fyllUtFraværSteg(page);
        await utfyllingUtils.lastOppLegeerklæring(page);
        await utfyllingUtils.fyllUtMedlemsskap(page);
        await utfyllingUtils.sendInnSøknad(page);
        await utfyllingUtils.kontrollerKvittering(page);
    });
});
