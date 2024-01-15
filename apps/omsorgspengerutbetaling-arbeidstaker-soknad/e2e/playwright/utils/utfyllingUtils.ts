/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page, expect } from '@playwright/test';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/nb.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling';

const fraDato = dayjs().startOf('isoWeek').subtract(3, 'weeks').format('DD.MM.YYYY');
const tilDato = dayjs().startOf('isoWeek').format('DD.MM.YYYY');
const datoDelvisFravær = dayjs().startOf('isoWeek').subtract(4, 'weeks').format('DD.MM.YYYY');
const fomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(2, 'day').format('DD.MM.YYYY');
const tomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(4, 'day').format('DD.MM.YYYY');
const frilansStartDato = dayjs().startOf('isoWeek').subtract(10, 'weeks').format('DD.MM.YYYY');

const selectRadioByNameAndValue = async (page: Page) => {
    await page.locator('input[type="radio"][value="JORDBRUK_SKOGBRUK"]').check();
};

const startSøknad = async (page: Page) => {
    await page.goto(startUrl);
    const intro = page.locator('.navds-guide-panel__content');
    await expect(intro).toContainText('Velkommen til søknad om omsorgspenger');
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
    await page.getByRole('button').getByText('Start søknad').click();
};

const fyllUtFosterbarnSteg = async (page: Page) => {
    await page.getByTestId('harFostrerbarn').getByText('Nei').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtDinArbeidssituasjonSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Din arbeidssituasjon' }).isVisible;
    await page
        .getByTestId('arbeidsforhold-liste-0')
        .getByTestId('arbeidsforhold-harHattFravær')
        .getByText('Ja')
        .click();
    await page.getByTestId('arbeidsforhold-harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene_no').check();
    await page.getByText('Jeg har jobbet mindre enn 4').click();
    await page.getByText('Jeg jobbet for en annen').click();

    await page
        .getByTestId('arbeidsforhold-liste-1')
        .getByTestId('arbeidsforhold-harHattFravær')
        .getByText('Nei')
        .click();

    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtFraværSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Hvilke dager søker du' }).isVisible();
    await page.getByTestId('harPerioderMedFravær_yes').check();

    await page.getByRole('button', { name: 'Legg til ny periode med fullt' }).click();
    await page.getByLabel('Fra og med').fill('01.01.2024');
    await page.getByLabel('Til og med').fill('05.01.2024');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('harDagerMedDelvisFravær').getByText('Nei').click();
    await page.getByTestId('utenlandsopphold_yes').check();
    await page.getByRole('button', { name: 'Legg til nytt utenlandsopphold' }).click();
    await page.getByLabel('Fra og med').fill('01.01.2024');
    await page.getByLabel('Til og med').fill('02.01.2024');
    await page.getByLabel('Velg land').selectOption('ISL');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const lastOppLegeerklæring = async (page: Page) => {
    await page.getByRole('heading', { name: 'Last opp legeerklæring' });
    await page.locator('input[name="vedlegg"]').setInputFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.locator('.attachmentListElement');
    await expect(listItems).toHaveCount(1);
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
    fyllUtOmBarnSteg: fyllUtFosterbarnSteg,
    fyllUtDinArbeidssituasjonSteg,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    fyllUtMedlemsskap,
    sendInnSøknad,
    kontrollerKvittering,
};
