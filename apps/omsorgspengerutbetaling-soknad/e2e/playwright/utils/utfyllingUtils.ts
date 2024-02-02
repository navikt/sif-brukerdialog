import { Page, expect } from '@playwright/test';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/nb.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling';
const date = dayjs('2023-10-04');

const fraDato = date.startOf('isoWeek').subtract(3, 'weeks').format('DD.MM.YYYY');
const tilDato = date.startOf('isoWeek').format('DD.MM.YYYY');
const datoDelvisFravær = date.startOf('isoWeek').subtract(4, 'weeks').format('DD.MM.YYYY');
const fomDatoIUtlandet = date.startOf('isoWeek').subtract(3, 'weeks').add(2, 'day').format('DD.MM.YYYY');
const tomDatoIUtlandet = date.startOf('isoWeek').subtract(3, 'weeks').add(4, 'day').format('DD.MM.YYYY');
const frilansStartDato = date.startOf('isoWeek').subtract(10, 'weeks').format('DD.MM.YYYY');

const selectRadioByNameAndValue = async (page: Page) => {
    await page.locator('input[type="radio"][value="JORDBRUK_SKOGBRUK"]').check();
};

const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550' /** Navs orgnur */,
    fraOgMed: '01.01.2010',
    tilOgMed: date.subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: date.subtract(1, 'year').format('DD.MM.YYYY'),
    varigEndringINæringsinntekt_inntektEtterEndring: '100',
    varigEndringINæringsinntekt_forklaring: 'Lorem ipsum',
    harRegnskapsfører: 'no',
};

const startSøknad = async (page: Page) => {
    await page.goto(startUrl);
    const intro = page.locator('.navds-guide-panel__content');
    await expect(intro).toContainText('Velkommen til søknad om omsorgspenger');
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
    await page.getByRole('button').getByText('Start søknad').click();
};

const fyllUtOmBarnfyllUtOmBarnToUnder13år = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om barn' });
    await page.getByRole('group', { name: 'Har du søkt om eller fått ekstra' }).getByLabel('Ja').click();
    await page.getByRole('group', { name: 'Har du dekket de 10 første omsorgsdagene i år?' }).getByLabel('Ja').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtFraværSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Dager du søker om utbetaling for' });

    /** Dager med fullt fravær */
    await page.getByTestId('harPerioderMedFravær_yes').check();
    await page.getByRole('button', { name: 'Legg til dager med fullt fravær fra jobb' }).click();
    await page.getByLabel('Fra og med').click();
    await page.getByLabel('Fra og med').fill(fraDato);
    await page.getByLabel('Fra og med').press('Tab');
    await page.getByRole('button', { name: 'Åpne datovelger' }).first().press('Tab');
    await page.getByLabel('Til og med').fill(tilDato);
    await page.getByLabel('Til og med').press('Tab');
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).press('Tab');
    await page.getByLabel('Dager med fullt fravær fra jobb').getByTestId('typedFormikForm-submitButton').click();

    /** Dager med delvis fravær */
    await page.getByTestId('harDagerMedDelvisFravær_yes').check();
    await page.getByRole('button', { name: 'Legg til dag med delvis fravær fra jobb' }).click();
    await page.getByLabel('Dato', { exact: true }).click();
    await page.getByLabel('Dato', { exact: true }).fill(datoDelvisFravær);
    await page.getByLabel('Antall timer du skulle ha jobbet denne dagen').selectOption('7.5');
    await page.getByText('Antall timer du var borte fra jobb denne dagen').click();
    await page.getByLabel('Antall timer du var borte fra jobb denne dagen').selectOption('3');
    await page.getByLabel('Dag med delvis fravær fra jobb').getByTestId('typedFormikForm-submitButton').click();

    /** Perioder i utlandet */
    await page.getByTestId('perioder_harVærtIUtlandet_yes').check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    await page.getByLabel('Fra og med').click();
    await page.getByLabel('Fra og med').fill(fomDatoIUtlandet);
    await page.getByLabel('Fra og med').press('Tab');
    await page.getByLabel('Til og med').fill(tomDatoIUtlandet);
    await page.getByLabel('Til og med').press('Tab');
    await page.getByLabel('Velg land').selectOption('BHR');
    await page.getByLabel('Utenlandsopphold').getByTestId('typedFormikForm-submitButton').click();

    await page.getByTestId('typedFormikForm-submitButton').click();
};

const lastOppLegeerklæring = async (page: Page) => {
    await page.getByRole('heading', { name: 'Last opp legeerklæring' });
    await page.locator('input[name="vedlegg"]').setInputFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.locator('.attachmentListElement');
    await expect(listItems).toHaveCount(1);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtVirksomhetDialog = async (page: Page) => {
    await page.getByLabel('Jordbruker').check();
    await page.getByLabel('Hva heter virksomheten?').fill(virksomhet.navn);
    await page.getByLabel('Opplysninger om den eldste virksomheten din').getByLabel('Ja').check();
    await page.getByLabel('Hva er organisasjonsnummeret?').fill(virksomhet.organisasjonsnummer);
    await page.getByText('Opplysninger om den eldste virksomheten dinHvilken type virksomhet har du?Fisker').click();
    await page.getByLabel('Startdato').fill(virksomhet.fraOgMed);
    await page.getByLabel('Eventuell sluttdato').fill(virksomhet.tilOgMed);
    await page
        .getByRole('group', {
            name: 'Har du hatt en varig endring i noen av arbeidsforholdene, virksomhetene eller arbeidssituasjonen din de siste fire årene?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Oppgi dato for endringen').fill(virksomhet.varigEndringINæringsinntekt_dato);
    await page
        .getByLabel('Oppgi næringsinntekten din etter endringen. Oppgi årsinntekten i hele kroner.')
        .fill(virksomhet.varigEndringINæringsinntekt_inntektEtterEndring);
    await page
        .getByLabel(
            'Her kan du skrive kort hva som har endret seg i arbeidsforholdene, virksomhetene eller arbeidssituasjonen din',
        )
        .fill(virksomhet.varigEndringINæringsinntekt_forklaring);
    await page.getByRole('group', { name: 'Har du regnskapsfører?' }).getByLabel('Nei').check();
    await page
        .getByLabel('Opplysninger om den eldste virksomheten din')
        .getByTestId('typedFormikForm-submitButton')
        .click();
};

const fyllerUtArbeidssituasjonSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Arbeidssituasjon' });
    await page.getByTestId('frilans_erFrilanser_yes').check();
    await page.getByLabel('Når startet du som frilanser?').click();
    await page.getByLabel('Når startet du som frilanser?').fill(frilansStartDato);
    await page.getByLabel('Når startet du som frilanser?').press('Tab');
    await page.getByTestId('frilans_jobberFortsattSomFrilans_yes').check();
    await page.getByTestId('selvstendig_erSelvstendigNæringsdrivende_yes').check();
    await page.getByTestId('selvstendig_harFlereVirksomheter_yes').check();
    await page.getByRole('button', { name: 'Registrer virksomhet' }).click();
    await fyllUtVirksomhetDialog(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllerUtFraværFraSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Fravær fra arbeid som selvstendig næringsdrivende og/eller frilanser' });

    const fieldsets = await page.$$('form fieldset');
    const numFieldsets = fieldsets.length;
    for (let i = 0; i < numFieldsets; i++) {
        if (i % 2 === 0) {
            await page
                .locator('form fieldset')
                .locator(`nth=${i}`)
                .getByText('Selvstendig næringsdrivende', { exact: true })
                .click();
        } else if (i % 3 === 0) {
            await page
                .locator('form fieldset')
                .locator(`nth=${i}`)
                .getByText('Både frilanser og selvstendig næringsdrivende', { exact: true })
                .click();
        } else {
            await page.locator('form fieldset').locator(`nth=${i}`).getByText('Frilanser', { exact: true }).click();
        }
    }
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtMedlemsskap = async (page: Page) => {
    await page.getByRole('heading', { name: 'Medlemskap i folketrygden' });
    await page.getByTestId('medlemskap-annetLandSiste12').getByText('Nei').click();
    await page.getByTestId('medlemskap-annetLandNeste12_no').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const sendInnSøknad = async (page: Page) => {
    await page.getByRole('heading', { name: 'Oppsummering' });
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
const kontrollerKvittering = async (page: Page) => {
    await page.getByRole('heading', { name: 'Vi har mottatt søknad om utbetaling av omsorgspenger' });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtVirksomhetDialog,
    fyllUtOmBarnfyllUtOmBarnToUnder13år,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    fyllerUtArbeidssituasjonSteg,
    fyllerUtFraværFraSteg,
    fyllUtMedlemsskap,
    sendInnSøknad,
    kontrollerKvittering,
};
