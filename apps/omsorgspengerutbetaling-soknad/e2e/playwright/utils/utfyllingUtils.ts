import { Page, expect } from '@playwright/test';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/nb.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);
dayjs.locale(locale);

// import {
//     getTestElement,
//     getTestElementByType,
//     selectRadioYesOrNo,
//     getInputByName,
//     submitModal,
//     submitSkjema,
//     getElement,
//     selectRadioByNameAndValue,
//     getRadioButtons,
//     selectRadioByValue,
// } from '.';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling';

const fraDato = dayjs().startOf('isoWeek').subtract(3, 'weeks').format('DD.MM.YYYY');
const tilDato = dayjs().startOf('isoWeek').format('DD.MM.YYYY');
const datoDelvisFravær = dayjs().startOf('isoWeek').subtract(4, 'weeks').format('DD.MM.YYYY');
const fomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(2, 'day').format('DD.MM.YYYY');
const tomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(4, 'day').format('DD.MM.YYYY');
const frilansStartDato = dayjs().startOf('isoWeek').subtract(10, 'weeks').format('DD.MM.YYYY');

const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550' /** Navs orgnur */,
    fraOgMed: '01.01.2010',
    tilOgMed: dayjs().subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: dayjs().subtract(1, 'year').format('DD.MM.YYYY'),
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

const fyllUtOmBarnMinstEttYngre13år = async (page: Page) => {
    await page.getByRole('heading', { name: 'Om barn' });
    await page.getByText('Ja, jeg bekrefter at jeg har dekket 10 omsorgsdager i år.').click();
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
    await page.getByRole('button', { name: 'Last opp legeerklæringen' }).click();
    await page
        .getByLabel('OpplastingsikonLast opp legeerklæringen')
        .setInputFiles('./e2e/playwright/files/navlogopng.png');
    const list = await page.getByTestId('legeerklæring-liste');
    expect(list.locator('.attachmentListElement')).toHaveCount(1);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtVirksomhetDialog = () => {
    // selectRadioByNameAndValue('næringstype', virksomhet.næringstype);
    // selectRadioByNameAndValue('registrertINorge', virksomhet.registrertINorge);
    // getInputByName('navnPåVirksomheten').click().type(virksomhet.navn).blur();
    // getInputByName('organisasjonsnummer').click().type(virksomhet.organisasjonsnummer).blur();
    // getInputByName('fom').click().type(virksomhet.fraOgMed).blur();
    // getInputByName('tom').click().type(virksomhet.tilOgMed).blur();
    // selectRadioByNameAndValue(
    //     'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
    //     virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
    // );
    // getInputByName('varigEndringINæringsinntekt_dato').click().type(virksomhet.varigEndringINæringsinntekt_dato).blur();
    // getInputByName('varigEndringINæringsinntekt_inntektEtterEndring')
    //     .click()
    //     .type(virksomhet.varigEndringINæringsinntekt_inntektEtterEndring)
    //     .blur();
    // getInputByName('varigEndringINæringsinntekt_forklaring')
    //     .click()
    //     .type(virksomhet.varigEndringINæringsinntekt_forklaring)
    //     .blur();
    // selectRadioByNameAndValue('harRegnskapsfører', virksomhet.harRegnskapsfører);
    // submitModal();
};

const fyllerUtArbeidssituasjonSteg = () => {
    //     selectRadioYesOrNo('frilans_erFrilanser', true);
    //     getInputByName('frilans_startdato').click().type(frilansStartDato).blur();
    //     selectRadioYesOrNo('frilans_jobberFortsattSomFrilans', true);
    //     selectRadioYesOrNo('selvstendig_erSelvstendigNæringsdrivende', true);
    //     selectRadioYesOrNo('selvstendig_harFlereVirksomheter', true);
    //     getElement('button').contains('Registrer virksomhet').click();
    //     fyllUtVirksomhetDialog();
    //     submitSkjema();
};

const fyllerUtFraværFraSteg = () => {
    // it('Fyller ut Fravær Fra steg', () => {
    //     getRadioButtons().each(($element, $index) => {
    //         if ($index % 2 === 0) {
    //             cy.wrap($element).within(() => {
    //                 selectRadioByValue('SELVSTENDIG_VIRKSOMHET');
    //             });
    //         } else if ($index % 3 === 0) {
    //             cy.wrap($element).within(() => {
    //                 selectRadioByValue('BEGGE');
    //             });
    //         } else
    //             cy.wrap($element).within(() => {
    //                 selectRadioByValue('FRILANSER');
    //             });
    //     });
    //     submitSkjema();
    // });
};

const sendInnSøknad = () => {
    // it('Sender inn søknad', () => {
    //     getTestElement('bekreft-label').click();
    //     getTestElement('typedFormikForm-submitButton').click();
    //     cy.wait('@innsending');
    // });
};
const kontrollerKvittering = () => {
    // it('Inneholder søknad mottatt tekst', () => {
    //     const el = getTestElement('kvittering-page');
    //     el.should('contain', 'Vi har mottatt søknad om utbetaling av omsorgspenger');
    // });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtVirksomhetDialog,
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    fyllerUtArbeidssituasjonSteg,
    fyllerUtFraværFraSteg,
    sendInnSøknad,
    kontrollerKvittering,
};
