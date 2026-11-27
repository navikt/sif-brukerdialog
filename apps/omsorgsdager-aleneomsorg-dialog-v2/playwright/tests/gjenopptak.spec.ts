import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import {
    gåTilTidspunkt,
    recentDate,
    startSøknad,
    velgRegistrertBarn,
    velgTidspunkt,
} from '../utils/soknadsflyt';
import { testAccessibility } from '../utils/testAccessibility';

test('gjenopptar søknaden med lagret svar', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);
    await velgRegistrertBarn(page);
    await gåTilTidspunkt(page);
    await velgTidspunkt(page, 'Alfa Testesen', false);

    const mellomlagring = page.waitForResponse((response) => {
        const request = response.request();
        return (
            request.url().includes('/mellomlagring/') &&
            request.method() === 'PUT' &&
            request.postDataJSON()?.resumeStepId === 'oppsummering'
        );
    });

    await page.getByRole('button', { name: 'Neste steg' }).click();
    await mellomlagring;
    await page.goto('/');

    await expect(page).toHaveURL(/\/soknad\/oppsummering$/);
    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText(new RegExp(`Tidspunkt for aleneomsorg:.*${recentDate.slice(-4)}`))).toBeVisible();
    await testAccessibility(page);
});
