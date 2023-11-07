import { test, expect } from '@playwright/test';

test('Test text info part', async ({ page }) => {
    await page.goto('http://localhost:8080/');

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

test('Test kalkulator part', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    const antallBarnSpm = page.getByText('Hvor mange av barna dine bor hos deg?');
    await expect(antallBarnSpm).toBeVisible();

    await page.getByRole('button', { name: 'Hva betyr dette?' }).click();
    const antallBarnSpmHvaBetyr = page.getByText(
        'Vi må vite hvor mange av barna dine som bor hos deg, det vil si barn som du er j',
    );
    await expect(antallBarnSpmHvaBetyr).toBeVisible();

    await page.getByLabel('Hvor mange av barna dine bor hos deg?').selectOption('1');

    const barnÅrstallSpm = page.getByText('Hvilket årstall er barnet født?');
    await expect(barnÅrstallSpm).toBeVisible();

    await page.getByRole('button', { name: 'Hvorfor spør vi om det?' }).click();

    const barnårstallInfoAvsnitt1 = page.getByText(
        'Omsorgsdager gjelder i utgangspunktet ut kalenderåret barnet er 12 år.',
    );
    await expect(barnårstallInfoAvsnitt1).toBeVisible();

    const barnårstallInfoAvsnitt2 = page.getByText(
        'Hvis du har fått vedtak om ekstra omsorgsdager fordi barnet har en kronisk/langv',
    );

    await expect(barnårstallInfoAvsnitt2).toBeVisible();
});
