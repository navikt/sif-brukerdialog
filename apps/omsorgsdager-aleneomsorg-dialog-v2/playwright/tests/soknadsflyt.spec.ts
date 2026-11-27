import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import {
    gåTilOppsummering,
    gåTilTidspunkt,
    leggTilFosterbarn,
    recentDate,
    recentYearLabel,
    sendSøknad,
    startSøknad,
    velgRegistrertBarn,
    velgTidspunkt,
} from '../utils/soknadsflyt';

test('fyller ut søknaden for registrert barn med konkret dato', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);
    await velgRegistrertBarn(page);
    await gåTilTidspunkt(page);
    await velgTidspunkt(page, 'Alfa Testesen', false);
    await gåTilOppsummering(page);

    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText(new RegExp(`Tidspunkt for aleneomsorg:.*${recentDate.slice(-4)}`))).toBeVisible();

    await sendSøknad(page);
});

test('fyller ut søknaden for registrert barn med aleneomsorg tidligere', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);
    await velgRegistrertBarn(page);
    await gåTilTidspunkt(page);
    await velgTidspunkt(page, 'Alfa Testesen', true);
    await gåTilOppsummering(page);

    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText('Du ble alene om omsorgen for over 2 år siden.')).toBeVisible();

    await sendSøknad(page);
});

test('fyller ut søknaden med fosterbarn når det ikke finnes registrerte barn', async ({ page }) => {
    await startSøknad(page, ScenarioType.ingenRegistrerteBarn);
    await leggTilFosterbarn(page);
    await gåTilTidspunkt(page);

    await page
        .getByRole('radiogroup', { name: 'Hvilket år ble du alene om omsorgen for Gamma Foster?' })
        .getByLabel(recentYearLabel)
        .check();
    await page.getByLabel('Hvilken dato ble du alene om omsorgen for Gamma Foster?').fill(recentDate);
    await gåTilOppsummering(page);

    await expect(page.getByText('Gamma Foster')).toBeVisible();
    await expect(page.getByText(new RegExp(`Tidspunkt for aleneomsorg:.*${recentDate.slice(-4)}`))).toBeVisible();

    await sendSøknad(page);
});
