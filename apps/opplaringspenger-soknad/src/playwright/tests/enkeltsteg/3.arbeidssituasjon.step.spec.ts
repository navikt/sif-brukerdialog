import { expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../../src/app/types/SøknadRoutes';
import { fyllUtArbeidssituasjonStep } from '../../utfylling-utils/3.arbeidssituasjonStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, context, SøknadRoutes.ARBEIDSSITUASJON, { arbeidssituasjon: undefined });
    await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
});

test('Fyll ut arbeidssituasjon steg', async ({ page }) => {
    await fyllUtArbeidssituasjonStep(page);
});
