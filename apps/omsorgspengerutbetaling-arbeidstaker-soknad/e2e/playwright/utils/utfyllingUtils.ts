import { Page, expect } from '@playwright/test';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/nb.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling-arbeidstaker';

const startSøknad = async (page: Page) => {
    await page.goto(startUrl);
    const intro = page.locator('.navds-guide-panel__content');
    await expect(intro).toContainText('Velkommen til søknad om omsorgspenger');
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
    await page.getByRole('button').getByText('Start søknad').click();
};

const fyllUtDineBarnSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Dine barn' }).isVisible;
    await page.getByRole('button', { name: 'Legg til barn' }).click();
    await page.getByLabel('Barnets navn').click();
    await page.getByLabel('Barnets navn').fill('Tore Tang');
    await page.getByLabel('Barnets fødselsdato').click();
    await page.getByLabel('Barnets fødselsdato').fill('10.10.2020');
    await page.getByLabel('Barnets fødselsdato').press('Tab');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('09898098122');
    await page.getByText('Barnet er mitt fosterbarn').click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtDinArbeidssituasjonSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Din arbeidssituasjon' }).isVisible;
    await page.getByTestId('arbeidsforhold-liste-0').getByTestId('arbeidsforhold-harHattFravær_yes').check();
    await page.getByTestId('arbeidsforhold-harArbeidsgiverUtbetaltDegLønnForOmsorgsdagene_no').check();
    await page.getByTestId('arbeidsforhold-utbetalingsårsak-nyoppstartetHosArbeidsgiver').check();
    await page.getByTestId('nyoppstartetHosArbeidsgiver-jobbetHosAnnenArbeidsgiver').check();

    await page.getByTestId('arbeidsforhold-liste-1').getByTestId('arbeidsforhold-harHattFravær_no').check();

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
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('input[type="file"]').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.getByText('navlogopng.png(2.31 KB)');
    await expect(listItems).toHaveCount(1);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtMedlemsskap = async (page: Page) => {
    await page.getByRole('heading', { name: 'Medlemskap i folketrygden' });
    await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Nei').check();
    await page.getByRole('group', { name: 'Planlegger du å bo i utlandet' }).getByLabel('Nei').check();
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
    fyllUtDineBarnSteg,
    fyllUtDinArbeidssituasjonSteg,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    fyllUtMedlemsskap,
    sendInnSøknad,
    kontrollerKvittering,
};
