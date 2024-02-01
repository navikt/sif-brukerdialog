import { test, expect } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockApi';
import { barnMock } from '../mock-data/barnMock';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test('Fyll ut søknad med annet barn', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await page.getByRole('heading', { level: 1, name: 'Hei PRESENTABEL' });
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Barn */
    const barn = barnMock.barn[0];
    await page.getByRole('heading', { level: 1, name: 'Barn' });
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill(barn.fødselsnummer);
    await page.getByLabel('Barnets navn').fill(`${barn.fornavn} ${barn.etternavn}`);
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('År').selectOption('2019');
    await page.getByLabel('Måned', { exact: true }).selectOption('5');
    await page.getByLabel('Lørdag 8').click();
    await page.getByLabel('Min relasjon til barnet').selectOption('mor');
    await page.getByTestId('sammeAdresse').getByLabel('Ja', { exact: true }).check();
    await page.getByRole('group', { name: 'Har barnet kronisk/langvarig' }).getByLabel('Ja').check();
    await page.getByTestId('høyereRisikoForFravær_no').check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Legeerklæring */
    await page.getByRole('heading', { level: 1, name: 'Legeerklæring' });
    await page.locator('input[name="vedlegg"]').setInputFiles('./e2e/playwright/files/navlogopng.png');
    await expect(await page.getByText('Fjern').count()).toEqual(1);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Oppsummering */
    await page.getByRole('heading', { level: 1, name: 'Oppsummering' });

    await expect(await page.getByText('PRESENTABEL HOFTE').isVisible()).toBeTruthy();
    await expect(await page.getByText('Fødselsnummer: 02869599258').isVisible()).toBeTruthy();
    await expect(await page.getByText('Navn: ALFABETISK FAGGOTT').isVisible()).toBeTruthy();
    await expect(await page.getByText('Fødselsdato: 8. juni 2019').isVisible()).toBeTruthy();
    await expect(await page.getByText('Din relasjon til barnet: mor').isVisible()).toBeTruthy();
    await expect(await page.getByText('Bor du sammen med barnet?Ja').isVisible()).toBeTruthy();
    await expect(
        await page.getByText('Har barnet kronisk/langvarig sykdom eller funksjonshemning?Ja').isVisible(),
    ).toBeTruthy();
    await expect(await page.getByText('navlogopng.png').isVisible()).toBeTruthy();

    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        )
        .check();
    await page.getByRole('button', { name: 'Send søknad', exact: true }).click();

    /** Kvittering */
    await page.waitForURL('**/soknad_sendt');
    await page.getByRole('heading', {
        name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    });
    await expect(
        await page
            .getByRole('heading', {
                name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
            })
            .isVisible(),
    ).toBeTruthy();
});
