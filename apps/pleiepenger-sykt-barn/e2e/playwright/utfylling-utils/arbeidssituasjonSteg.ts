import { DateRange } from '@navikt/sif-common-utils/lib';
import { Page } from '@playwright/test';
import { subMonths, subWeeks, subYears } from 'date-fns';
import { formatInputDate } from '../utils';

const fyllUtVirksomhetDialog = async (page: Page, søknadsperiode: DateRange) => {
    const virksometStartdato = subYears(søknadsperiode.from, 10);
    const virksometSluttdato = subWeeks(søknadsperiode.from, 1);
    const endringDato = subMonths(søknadsperiode.from, 8);

    await page.getByLabel('Jordbruker').check();
    await page.getByLabel('Hva heter virksomheten?').fill('Jordlig');
    await page.getByLabel('Opplysninger om den eldste virksomheten din').getByLabel('Ja').check();
    await page.getByLabel('Hva er organisasjonsnummeret?').fill('991012133');
    await page.getByLabel('Startdato', { exact: true }).fill(formatInputDate(virksometStartdato));
    await page.getByLabel('Eventuell sluttdato', { exact: true }).fill(formatInputDate(virksometSluttdato));
    await page
        .getByRole('group', {
            name: 'Har du hatt en varig endring i noen av arbeidsforholdene, virksomhetene eller arbeidssituasjonen din de siste fire årene?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Oppgi dato for endringen').fill(formatInputDate(endringDato));
    await page.getByLabel('Oppgi næringsinntekten din etter endringen. Oppgi årsinntekten i hele kroner.').fill('222');
    await page
        .getByLabel('Her kan du skrive kort hva som har endret seg i arbeidsforholdene')
        .fill('Alt har endret seg');

    await page.getByRole('group', { name: 'Har du regnskapsfører?' }).getByLabel('Ja').check();
    await page.getByLabel('Oppgi navnet til regnskapsfører').fill('Regnskapsførernavn');
    await page.getByLabel('Oppgi telefonnummeret til regnskapsfører').fill('00112233');
    await page
        .getByLabel('Opplysninger om den eldste virksomheten din')
        .getByTestId('typedFormikForm-submitButton')
        .click();
};

const fyllUtEøsArbeidstakerFrilanserDialog = async (page: Page, søknadsperiode: DateRange) => {
    const eøsPeriode = {
        from: subMonths(søknadsperiode.from, 2),
        to: subMonths(søknadsperiode.from, 1),
    };
    await page.getByLabel('Fra og med').fill(formatInputDate(eøsPeriode.from));
    await page.getByLabel('Til og med').fill(formatInputDate(eøsPeriode.to));
    await page.getByLabel('Til og med').press('Tab');
    await page.getByLabel('Velg land').selectOption('BEL');
    await page.getByText('Arbeidstaker', { exact: true }).click();
    await page.getByLabel('Skriv inn navnet på arbeidsgiveren').fill('EøsArbeidsgiver');
    await page.getByRole('button', { name: 'Ok' }).click();
};

const fyllUtEøsSnDialog = async (page: Page, søknadsperiode: DateRange) => {
    const eøsPeriode = {
        from: subMonths(søknadsperiode.from, 2),
        to: subMonths(søknadsperiode.from, 1),
    };
    await page.getByLabel('Jordbruker').check();
    await page.getByLabel('Skriv inn navnet på virksomheten').fill('eøs virksomhet');
    await page.getByLabel('I hvilket land var').selectOption('EST');
    await page.getByLabel('Skriv inn virksomhetens organisasjonsnummer/identifikasjonsnummer').fill('123123123');
    await page.getByLabel('Startdato', { exact: true }).fill(formatInputDate(eøsPeriode.from));
    await page.getByLabel('Sluttdato', { exact: true }).fill(formatInputDate(eøsPeriode.to));
    await page.getByLabel('Er pågående').check();
    await page.getByRole('button', { name: 'Ok' }).click();
};

export const arbeidssituasjonSteg = {
    fyllUtVirksomhetDialog,
    fyllUtEøsArbeidstakerFrilanserDialog,
    fyllUtEøsSnDialog,
};
