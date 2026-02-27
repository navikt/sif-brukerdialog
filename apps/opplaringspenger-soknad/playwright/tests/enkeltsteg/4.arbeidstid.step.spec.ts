import { expect, test } from '@playwright/test';

import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { fyllUtArbeidstid } from '../../utfylling-utils/4.arbeidstidStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSTID);
    await expect(page.getByRole('heading', { name: 'Fravær fra jobb på dagene du er i opplæring' })).toBeVisible();
});

test('Fyll ut arbeidstid steg', async ({ page }) => {
    await fyllUtArbeidstid(page);
});
