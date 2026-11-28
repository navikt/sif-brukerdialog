import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import {
    gåTilOppsummering,
    gåTilTidspunkt,
    leggTilFosterbarn,
    nyligÅrLedetekst,
    nyligDato,
    sendSøknad,
    startSøknad,
    velgRegistrertBarn,
    velgTidspunkt,
} from '../utils/soknadsflyt';

const nyligIsoDato = nyligDato.split('.').reverse().join('-');

test('fyller ut søknaden for registrert barn med konkret dato', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);
    await velgRegistrertBarn(page);
    await gåTilTidspunkt(page);
    await velgTidspunkt(page, 'Alfa Testesen', false);
    await gåTilOppsummering(page);

    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText(new RegExp(`Tidspunkt for aleneomsorg:.*${nyligDato.slice(-4)}`))).toBeVisible();

    await sendSøknad(page, [
        {
            aktørId: '2811762539343',
            navn: 'Alfa Testesen',
            tidspunktForAleneomsorg: 'SISTE_2_ÅRENE',
            dato: nyligIsoDato,
            type: 'FRA_OPPSLAG',
        },
    ]);
});

test('fyller ut søknaden for registrert barn med aleneomsorg tidligere', async ({ page }) => {
    await startSøknad(page, ScenarioType.default);
    await velgRegistrertBarn(page);
    await gåTilTidspunkt(page);
    await velgTidspunkt(page, 'Alfa Testesen', true);
    await gåTilOppsummering(page);

    await expect(page.getByText('Alfa Testesen')).toBeVisible();
    await expect(page.getByText('Du ble alene om omsorgen for over 2 år siden.')).toBeVisible();

    await sendSøknad(page, [
        {
            aktørId: '2811762539343',
            navn: 'Alfa Testesen',
            tidspunktForAleneomsorg: 'TIDLIGERE',
            type: 'FRA_OPPSLAG',
        },
    ]);
});

test('fyller ut søknaden med fosterbarn når det ikke finnes registrerte barn', async ({ page }) => {
    await startSøknad(page, ScenarioType.ingenRegistrerteBarn);
    await leggTilFosterbarn(page);
    await gåTilTidspunkt(page);

    await page
        .getByRole('radiogroup', { name: 'Hvilket år ble du alene om omsorgen for Gamma Foster?' })
        .getByLabel(nyligÅrLedetekst)
        .check();
    await page.getByLabel('Hvilken dato ble du alene om omsorgen for Gamma Foster?').fill(nyligDato);
    await gåTilOppsummering(page);

    await expect(page.getByText('Gamma Foster')).toBeVisible();
    await expect(page.getByText(new RegExp(`Tidspunkt for aleneomsorg:.*${nyligDato.slice(-4)}`))).toBeVisible();

    await sendSøknad(page, [
        {
            identitetsnummer: '09847696068',
            navn: 'Gamma Foster',
            fødselsdato: '2021-03-15',
            tidspunktForAleneomsorg: 'SISTE_2_ÅRENE',
            dato: nyligIsoDato,
            type: 'FOSTERBARN',
        },
    ]);
});
