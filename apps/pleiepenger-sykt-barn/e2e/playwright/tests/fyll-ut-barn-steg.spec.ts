import { Page, test, expect } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../utils/routeUtils';
import { checkA11y } from '../utils';

const barnetsNavn = 'NOTORISK LURING';
const barnetsFødselsnummer = '08861999573';
const barnetsFødselsdato = '08.12.2019';
const relasjonAnnetBeskrivelse = 'Annet relasjon beskrivelse';

test.beforeEach(async ({ page }) => {
    await routeUtils.startOnStep(page, StepID.OPPLYSNINGER_OM_BARNET);
});

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/tidsrom');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/arbeidssituasjon');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/arbeidstid');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/omsorgstilbud');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/medlemskap');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/legeerklaering');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/oppsummering');
    await expect(await page.getByRole('heading', { name: 'Oppsummering' }).isVisible()).toBeTruthy();
};

test('Fyll ut steg med registrert barn', async ({ page }) => {
    await page.getByLabel('ALFABETISK FAGGOTTFødt 08.12.2019').check();
    await checkA11y(page);
    await gåTilOppsummering(page);
    await expect(await page.getByText('Navn: ALFABETISK FAGGOTTFødselsdato: 08.12.2019').isVisible()).toBeTruthy();
    await checkA11y(page);
});

test('Fyll ut steg med annet barn', async ({ page }) => {
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill(barnetsFødselsnummer);
    await page.getByLabel('Barnets navn').fill(barnetsNavn);
    await page.getByLabel('Annet', { exact: true }).check();
    await page
        .getByLabel('Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for')
        .fill(relasjonAnnetBeskrivelse);
    await checkA11y(page);
    await gåTilOppsummering(page);

    await expect(
        await page.getByText('Om barnetFødselsnummer: 08861999573Navn: NOTORISK LURING').isVisible(),
    ).toBeTruthy();
    await expect(
        await page
            .getByText('Relasjon til barnetDin beskrivelse av relasjon og tilsynsrolle for barnet:Annet ')
            .isVisible(),
    ).toBeTruthy();
    await checkA11y(page);
});

test('Fyll ut steg med annet barn uten fnr - utlandet', async ({ page }) => {
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnet har ikke fødselsnummer/D-nummer').check();
    await page.getByLabel('Barnet bor i utlandet').check();
    await page.getByLabel('Barnets navn').fill(barnetsNavn);
    await page.getByLabel('Barnets fødselsdato').fill(barnetsFødselsdato);
    await page
        .getByRole('group', { name: 'Hvilken relasjon har du til barnet?' })
        .getByLabel('Annet', { exact: true })
        .check();
    await page
        .getByLabel('Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for')
        .fill(relasjonAnnetBeskrivelse);
    await page.locator('input[name="fødselsattest"]').setInputFiles('e2e/playwright/files/fødselsattest.png');
    await checkA11y(page);
    await gåTilOppsummering(page);

    await expect(await page.getByText('Fødselsdato: 08.12.2019Navn: NOTORISK LURING').isVisible()).toBeTruthy();
    await expect(
        await page
            .getByText('Om barnetFødselsdato: 08.12.2019Navn: NOTORISK LURINGUten fødselsnummer/D-nummer')
            .isVisible(),
    ).toBeTruthy();
    await expect(await page.getByText('FødselsattestFilikonfødselsattest.png').isVisible()).toBeTruthy();
    await checkA11y(page);
});
