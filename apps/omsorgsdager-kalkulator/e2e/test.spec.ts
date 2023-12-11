import { test, expect } from '@playwright/test';

const year = new Date().getFullYear();

test('Test text info part', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    const appTitle = page.getByRole('heading', {
        name: 'Kalkulator for omsorgsdager',
    });
    await expect(appTitle).toBeVisible();
    await expect(appTitle).toHaveText('Kalkulator for omsorgsdager');

    const appTitleDescription = page.getByText('Finn ut hvor mange omsorgsdager du kan ha rett til');
    await expect(appTitleDescription).toBeVisible();

    const infoHeader = page.getByRole('heading', {
        name: 'Her kan du se hvor mange omsorgsdager du kan ha rett til.',
    });
    await expect(infoHeader).toBeVisible();

    const infoAvsnitt1 = page.getByText(
        'Kalkulatoren regner ut hvor mange omsorgsdager du har rett til for barn som bor fast hos deg. Hvis dere som foreldre ikke bor sammen, men har avtale om delt fast bosted, har barnet fast bosted hos begge foreldre.',
    );
    await expect(infoAvsnitt1).toBeVisible();

    await page.getByRole('button', { name: 'Er du samværsforelder?' }).click();

    const samværsforelderInfoAvsnitt1 = page.getByText(
        'Kalkulatoren beregner kun omsorgsdager for den forelderen som bor fast med barnet',
    );
    await expect(samværsforelderInfoAvsnitt1).toBeVisible();

    const samværsforelderInfoAvsnitt2 = page.getByText(
        'Hvis du har fått omsorgsdager av forelderen som bor med barnet, vil du ha rett til disse dagene selv om de ikke vises i kalkulatoren.',
    );
    await expect(samværsforelderInfoAvsnitt2).toBeVisible();
});

test('Test kalkulator 1 barn', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('1');

    await page.getByLabel('Hvilket årstall er barnet født?').selectOption(year.toString());

    await page.getByRole('group', { name: 'Bor barnet fast hos deg?' }).getByLabel('Ja').check();

    await page
        .getByRole('group', {
            name: 'Har du fått ekstra omsorgsdager fordi barnet har en sykdom eller funksjonshemning som gjør at du oftere må være borte fra jobb?',
        })
        .getByLabel('Ja')
        .check();

    await page
        .getByRole('group', {
            name: 'Har du fått vedtak om ekstra omsorgsdager fordi du er alene om omsorgen for barnet?',
        })
        .getByLabel('Ja')
        .check();

    await page.getByRole('button').getByText('Beregn').click();
    await page.getByRole('button').getByText('Beregn').click();

    await page.getByRole('heading', { name: 'Nyheter og presse' }).click();
    await page.getByRole('heading', { name: '40 omsorgsdager' }).isVisible();

    await page.getByRole('button', { name: 'Vis mer' }).click();

    await page.getByText('Grunnrett for 1 barn10 dager').isVisible();
    await page.getByText('Ekstra pga. aleneomsorg10 dager').first().isVisible();
    await page.getByText('Barn med kronisk sykdom10 dager').isVisible();
    await page.getByText('Ekstra pga. aleneomsorg10 dager').nth(1).isVisible();
    await page.getByText('Totalt antall omsorgsdager= 40 dager').isVisible();
});

test('Test kalkulator Barn bor ikke fast med', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('1');

    await page.getByLabel('Hvilket årstall er barnet født?').selectOption(year.toString());

    await page.getByRole('group', { name: 'Bor barnet fast hos deg?' }).getByLabel('Nei').check();

    await page.getByText('For å ha rett på omsorgsdager for dette barnet, må barnet bo fast hos deg.').isVisible();

    await page.getByRole('button').getByText('Beregn').click();
    await page.getByRole('button').getByText('Beregn').click();

    await page.getByRole('heading', { name: 'Nyheter og presse' }).click();
    await page.getByRole('heading', { name: '0 omsorgsdager' }).isVisible();
});

test('Test kalkulator Barn 18 år', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('1');

    await page.getByLabel('Hvilket årstall er barnet født?').selectOption((year - 19).toString());

    await page
        .getByText('Du har ikke rett på omsorgsdager for barn som er 19 år eller eldre. Omsorgsdager')
        .isVisible();

    await page.getByRole('button').getByText('Beregn').click();
    await page.getByRole('button').getByText('Beregn').click();

    await page.getByRole('heading', { name: 'Resultat' }).isVisible();
    await page.getByRole('heading', { name: '0 omsorgsdager' }).isVisible();
});

test('Test kalkulator Barn 13 år', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('1');

    await page.getByLabel('Hvilket årstall er barnet født?').selectOption((year - 13).toString());

    await page.getByRole('group', { name: 'Bor barnet fast hos deg?' }).getByLabel('Ja').check();

    await page
        .getByRole('group', {
            name: 'Har du fått ekstra omsorgsdager fordi barnet har en sykdom eller funksjonshemning som gjør at du oftere må være borte fra jobb?',
        })
        .getByLabel('Nei')
        .check();

    await page
        .getByText('For å få omsorgsdager for barn som er 13 år eller eldre, må du ha søkt og fått i')
        .isVisible();

    await page
        .getByRole('group', {
            name: 'Har du fått ekstra omsorgsdager fordi barnet har en sykdom eller funksjonshemning som gjør at du oftere må være borte fra jobb?',
        })
        .getByLabel('Ja')
        .check();

    await page
        .getByRole('group', {
            name: 'Har du fått vedtak om ekstra omsorgsdager fordi du er alene om omsorgen for barnet?',
        })
        .getByLabel('Nei')
        .check();

    await page.getByRole('button').getByText('Beregn').click();
    await page.getByRole('button').getByText('Beregn').click();

    await page.getByRole('heading', { name: 'Resultat' }).isVisible();
    await page.getByRole('heading', { name: '20 omsorgsdager' }).isVisible();

    await page.getByRole('button', { name: 'Vis mer' }).click();
    await page.getByText('Grunnrett for 1 barn10 dager').isVisible();
    await page.getByText('Barn med kronisk sykdom10 dager').isVisible();
    await page.getByText('Totalt antall omsorgsdager= 20 dager').isVisible();
});

test('Test kalkulator 2 barn test paneler', async ({ page }) => {
    await page.goto('http://localhost:8080/omsorgspenger/kalkulator-antall-omsorgsdager');

    await page.getByLabel('Hvor mange egne barn bor med deg?').selectOption('2');
    await page
        .locator('div')
        .filter({ hasText: /^Barn 1Vis mer$/ })
        .getByRole('button')
        .click();
    await page
        .locator('div')
        .filter({ hasText: /^Barn 2Vis mer$/ })
        .getByRole('button')
        .click();
});
