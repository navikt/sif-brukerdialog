import { DateRange } from '@navikt/sif-common-utils/lib';
import { Page } from '@playwright/test';
import { addDays } from 'date-fns';
import { formatInputDate } from '../../setup';

const mottarOmsorgsstønadDelerAvPeriode = async (page: Page, søknadsperiode: DateRange) => {
    const omsorgsperiode: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 5),
    };
    await page
        .getByRole('group', { name: 'Mottar du fosterhjemsgodtgjørelse eller omsorgsstønad fra kommunen?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('group', { name: 'Mottar du denne stønaden eller godtgjørelsen gjennom hele perioden du søker om?' })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', { name: 'Starter stønaden eller godtgjørelsen underveis i pleiepengeperioden din?' })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Startdato:').fill(formatInputDate(omsorgsperiode.from));
    await page
        .getByRole('group', { name: 'Stopper stønaden eller godtgjørelsen underveis i pleiepengeperioden din?' })
        .getByLabel('Ja')
        .check();
    await page.getByLabel('Sluttdato:').fill(formatInputDate(omsorgsperiode.to));
    // await page
    //     .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
    //     .getByLabel('Ja')
    //     .check();
};

export const fyllUtOmsorgsstønadArbeidssituasjon = {
    mottarOmsorgsstønadDelerAvPeriode,
};
