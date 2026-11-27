import { expect, type Page } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from './scenario';
import { testAccessibility } from './testAccessibility';

const currentYear = new Date().getFullYear();
export const recentDate = `10.10.${currentYear - 1}`;
export const recentYearLabel = `I ${currentYear - 1} eller ${currentYear}`;
export const earlierYearLabel = `I ${currentYear - 2} eller tidligere`;

export const startSøknad = async (page: Page, scenario: ScenarioType) => {
    await setScenario(page, scenario);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Hei TEST', level: 2 })).toBeVisible();
    await testAccessibility(page);

    await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page.getByRole('heading', { name: 'Om aleneomsorg for barn', level: 1 })).toBeVisible();
    await testAccessibility(page);
};

export const velgRegistrertBarn = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Kryss av for barn du er alene om omsorgen for:' })
        .getByRole('checkbox', { name: /Alfa Testesen/ })
        .check();
    await page.getByRole('radiogroup', { name: 'Har du avtale om delt fast bosted for barnet?' }).getByLabel('Nei').check();
};

export const leggTilFosterbarn = async (page: Page) => {
    await expect(page.getByText('Du må ha minst ett barn for å kunne gå videre.')).toBeVisible();
    await page.getByRole('button', { name: 'Legg til barn' }).click();
    const dialog = page.getByRole('dialog', { name: 'Legg til barn' });
    await expect(dialog).toBeVisible();
    await testAccessibility(page);

    await dialog.getByLabel('Barnets navn').fill('Gamma Foster');
    await dialog.getByLabel(/Barnets fødselsdato/).fill('15.03.2021');
    await dialog.getByLabel('Barnets fødselsnummer/D-nummer').fill('09847696068');
    await dialog.getByLabel('Barnet er mitt fosterbarn').check();
    await dialog.getByRole('button', { name: 'Ok', exact: true }).click();

    await page
        .getByRole('group', { name: 'Kryss av for barn du er alene om omsorgen for:' })
        .getByRole('checkbox', { name: /Gamma Foster/ })
        .check();
    await page.getByRole('radiogroup', { name: 'Har du avtale om delt fast bosted for barnet?' }).getByLabel('Nei').check();
};

export const gåTilTidspunkt = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Tidspunkt for aleneomsorg', level: 1 })).toBeVisible();
    await testAccessibility(page);
};

export const velgTidspunkt = async (page: Page, barnNavn: string, tidligere: boolean) => {
    const tidspunktGruppe = page.getByRole('radiogroup', {
        name: `Hvilket år ble du alene om omsorgen for ${barnNavn}?`,
    });

    if (tidligere) {
        await tidspunktGruppe.getByLabel(earlierYearLabel).check();
    } else {
        await tidspunktGruppe.getByLabel(recentYearLabel).check();
        await page.getByLabel(`Hvilken dato ble du alene om omsorgen for ${barnNavn}?`).fill(recentDate);
    }
};

export const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Barn du er alene om omsorgen for', level: 2 })).toBeVisible();
    await testAccessibility(page);
};

export const sendSøknad = async (page: Page) => {
    await page
        .getByRole('checkbox', {
            name: 'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgsdager.',
        })
        .check();
    await page.getByRole('button', { name: 'Send søknad', exact: true }).click();
    await expect(
        page.getByRole('heading', { name: 'Vi har mottatt søknad om ekstra omsorgsdager', level: 1 }),
    ).toBeVisible();
    await testAccessibility(page);
};
