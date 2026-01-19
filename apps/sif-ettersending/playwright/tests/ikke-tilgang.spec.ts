import { expect, test } from '@playwright/test';

import { Søknadstype } from '../../src/app/types/Søknadstype';
import { playwrightApiMockData } from '../mock-data/playwrightApiMockData';
import { testAccessibility } from '../utils/testAccessibility';
import { startUrl } from '../utils/utfyllingUtils';

export const getSøknadstypeUrl = (søknadstype: string) => {
    return `${startUrl}/${søknadstype}`;
};

test('Søker har ikke tilgang', async ({ page }) => {
    await page.route('**/oppslag/soker', async (route) => {
        await route.fulfill({ status: 451 });
    });
    await page.route('**/oppslag/barn', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(playwrightApiMockData.barnMock) });
    });
    await page.route('**/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN', async (route) => {
        await route.fulfill({ status: 200, body: '{}' });
    });
    await page.goto(getSøknadstypeUrl(Søknadstype.pleiepengerSyktBarn));
    await expect(page.getByRole('heading', { name: 'Ingen tilgang' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Her kan du laste ned papirsø' })).not.toBeVisible();
    await testAccessibility(page);
});
