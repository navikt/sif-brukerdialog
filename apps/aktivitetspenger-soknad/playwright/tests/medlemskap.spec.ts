import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { mellomlagringTilMedlemskap } from '../mock-data/mellomlagring';
import { setScenarioWithMellomlagring } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

test('gjenopptar søknaden på medlemskap med mellomlagring', async ({ page }) => {
    await setScenarioWithMellomlagring(page, ScenarioType.kanSøkeFørstegang, mellomlagringTilMedlemskap);
    await page.goto('/');

    const harBoddINorge = 'Har du bodd sammenhengende i Norge de fem siste årene?';
    await expect(page).toHaveURL(/\/soknad\/medlemskap/);
    await expect(page.getByRole('radiogroup', { name: harBoddINorge })).toBeVisible();
    await testAccessibility(page);
});
