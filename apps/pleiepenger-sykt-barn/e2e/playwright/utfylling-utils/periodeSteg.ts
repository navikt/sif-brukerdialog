/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, Page } from '@playwright/test';
import { formatInputDate } from '../utils';
import { DateRange } from '@navikt/sif-common-utils/lib';

const velgPeriode = async (page: Page, periode: DateRange) => {
    const periodeFraString = formatInputDate(periode.from);
    const periodeTilString = formatInputDate(periode.to);
    await page.getByLabel('Fra og med').fill(periodeFraString);
    await page.getByLabel('Til og med').fill(periodeTilString);
    await page
        .getByRole('group', { name: 'Skal du reise til utlandet i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('group', { name: 'Skal du ha ferie i perioden du søker for?' }).getByLabel('Nei').check();
};

const leggTilUtenlandsopphold = async (page: Page, periodeUtenlandsopphold: DateRange, innlagtPeriode: DateRange) => {
    await page
        .getByRole('group', { name: 'Skal du reise til utlandet i perioden du søker for?' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();

    await page.getByLabel('Utenlandsopphold').getByLabel('Fra og med').click();
    await page
        .getByLabel('Utenlandsopphold')
        .getByLabel('Fra og med')
        .fill(formatInputDate(periodeUtenlandsopphold.from));
    await page.getByLabel('Utenlandsopphold').getByLabel('Til og med').click();
    await page
        .getByLabel('Utenlandsopphold')
        .getByLabel('Til og med')
        .fill(formatInputDate(periodeUtenlandsopphold.to));
    await page.getByLabel('Utenlandsopphold').getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Velg land').selectOption('AFG');
    await page.getByLabel('Utenlandsopphold').getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Periode(r) barnet er innlagt' }).click();
    await page.getByRole('button', { name: 'Legg til periode barnet er innlagt' }).click();
    await page
        .getByLabel('Periode barnet er innlagt')
        .getByLabel('Fra og med')
        .fill(formatInputDate(innlagtPeriode.from));
    await page
        .getByLabel('Periode barnet er innlagt')
        .getByLabel('Til og med')
        .fill(formatInputDate(innlagtPeriode.from));

    await page.getByLabel('Periode barnet er innlagt').getByTestId('typedFormikForm-submitButton').click();
    await page.getByText('For norsk offentlig regning').click();
    await page.getByLabel('Utenlandsopphold').getByTestId('typedFormikForm-submitButton').click();

    await expect(page.getByText('Afghanistan14. sep. 2023 - 17. sep. 2023 Fjern')).toBeVisible();
};

const leggTilFerie = async (page: Page, ferieperiode: DateRange) => {
    await page.getByRole('group', { name: 'Skal du ha ferie i perioden du søker for?' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til ferie' }).click();
    await page.getByLabel('Ferie').getByLabel('Fra og med').fill(formatInputDate(ferieperiode.from));
    await page.getByLabel('Ferie').getByLabel('Til og med').fill(formatInputDate(ferieperiode.to));
    await page.getByLabel('Ferie').getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByText('14. sep. 2023 - 17. sep. 2023 Fjern', { exact: true })).toBeVisible();
};

export const periodeSteg = {
    leggTilFerie,
    leggTilUtenlandsopphold,
    velgPeriode,
};
