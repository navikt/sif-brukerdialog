import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { gåTilOppsummeringMedRegistrertBarn } from '../utils/soknadFlow';

test('markerer manglende vedlegg og hindrer innsending', async ({ page }) => {
    await gåTilOppsummeringMedRegistrertBarn(page, ScenarioType.vedleggMangler);

    await expect(page.getByText('[mangler]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
});
