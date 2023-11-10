import { Page, test, expect } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../setup/routeUtils';
import { checkA11y, getSøknadsperiode } from '../setup';
import { setNow } from '../setup/setNow';
import { barnSteg } from '../utfylling-utils/barnSteg';

const barnetsNavn = 'NOTORISK LURING';
const barnetsFødselsnummer = '08861999573';
const barnetsFødselsdato = '08.12.2019';
const relasjonAnnetBeskrivelse = 'Annet relasjon beskrivelse';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnStep(page, StepID.OPPLYSNINGER_OM_BARNET, getSøknadsperiode());
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
    await barnSteg.fyllUtMedRegistrertBarn(page, 'ALFABETISK FAGGOTTFødt 08.12.2019');
    await checkA11y(page);
    await gåTilOppsummering(page);
    await expect(await page.getByText('Navn: ALFABETISK FAGGOTTFødselsdato: 08.12.2019').isVisible()).toBeTruthy();
    await checkA11y(page);
});

test('Fyll ut steg med annet barn', async ({ page }) => {
    await barnSteg.fyllUtAnnetBarnMedFnr(page, {
        fnr: barnetsFødselsnummer,
        navn: barnetsNavn,
        relasjon: relasjonAnnetBeskrivelse,
    });
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
    await barnSteg.fyllUtAnnetBarnUtenFnr(page, {
        fødselsdato: barnetsFødselsdato,
        navn: barnetsNavn,
        relasjon: relasjonAnnetBeskrivelse,
        fødselsattest: 'e2e/playwright/files/fødselsattest.png',
    });
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
