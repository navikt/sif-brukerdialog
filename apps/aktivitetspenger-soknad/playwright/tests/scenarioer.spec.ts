import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

const sperredeScenarioer = [
    {
        scenario: ScenarioType.ubehandletFørstegangssøknad,
        tekst: 'Du har allerede sendt inn en søknad om aktivitetspenger, og den ligger i kø til behandling. Du kan derfor ikke sende inn en ny søknad nå.',
        harInnsynLenke: false,
    },
    {
        scenario: ScenarioType.ubehandletAndregangssøknad,
        tekst: 'Du har allerede sendt inn en søknad om aktivitetspenger, og den ligger i kø til behandling. Du kan derfor ikke sende inn en ny søknad nå.',
        harInnsynLenke: true,
    },
    {
        scenario: ScenarioType.harAktivitetspengerMenUtenforSøknadsvindu,
        tekst: 'Du har allerede fått innvilget aktivitetspenger. Du kan derfor ikke sende inn en ny søknad nå.',
        harInnsynLenke: true,
    },
    {
        scenario: ScenarioType.sperretAnnet,
        tekst: 'Du kan ikke sende inn søknad om aktivitetspenger på dette tidspunktet.',
        harInnsynLenke: false,
    },
];

for (const { scenario, tekst, harInnsynLenke } of sperredeScenarioer) {
    test(`${scenario} viser årsaken til at søknaden er sperret`, async ({ page }) => {
        await setScenario(page, scenario);
        await page.goto('/');

        await expect(page.getByRole('heading', { name: 'Søknad om aktivitetspenger', level: 1 })).toBeVisible();
        await expect(page.getByText(tekst)).toBeVisible();

        const innsynLenke = page.getByRole('link', { name: 'Dine aktivitetspenger' });
        if (harInnsynLenke) {
            await expect(innsynLenke).toBeVisible();
        } else {
            await expect(innsynLenke).toHaveCount(0);
        }

        await expect(page.locator('button[type="submit"]')).toHaveCount(0);
    });
}

for (const scenario of [ScenarioType.kanSøkeFørstegang]) {
    test(`${scenario} starter søknadsflyten`, async ({ page }) => {
        await setScenario(page, scenario);
        await page.goto('/');

        await expect(page.locator('main')).toBeVisible();
        await page.locator('input[type="checkbox"]').first().check();
        await page.locator('button[type="submit"]').first().click();

        await expect(page).toHaveURL(/\/soknad\/kontonummer/);
    });
}
