import { test } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../utils/routeUtils';
import { setNow } from '../utils/setNow';
import { formatInputDate, getSøknadsperiode } from '../utils';
import { addDays } from 'date-fns';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { arbeidssituasjonSteg } from '../utfylling-utils/arbeidssituasjonSteg';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnStep(page, StepID.ARBEIDSSITUASJON);
});

const søknadsperiode = getSøknadsperiode();

test('Fyll ut komplett steg', async ({ page }) => {
    await page.getByLabel('Arbeidsgivere').getByLabel('Ja').check();
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .fill('37,5');

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
    await page
        .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
        .getByLabel('Ja')
        .check();

    /** Frilanser */
    const frilansperiode: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 5),
    };
    await page.getByLabel('Jeg jobber både som frilanser og mottar honorar').check();
    await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Jobber du fortsatt som frilanser?' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Jobber du fortsatt som frilanser?' }).getByLabel('Nei').check();
    await page.getByLabel('Når sluttet du å jobbe som frilanser?').fill(formatInputDate(frilansperiode.from));
    await page
        .getByLabel('Hvor mange timer jobbet du vanligvis som frilanser? Oppgi tiden i et snitt per uke:')
        .fill('5');

    /** Selvstendig næringsdrivende */
    await page.getByLabel('Selvstendig næringsdrivende').getByLabel('Ja').check();
    await page
        .getByRole('group', { name: 'Har du flere enn én næringsvirksomhet som er aktiv?' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Registrer virksomhet' }).click();
    await arbeidssituasjonSteg.fyllUtVirksomhetDialog(page, søknadsperiode);
    await page
        .getByLabel(
            'Hvor mange timer jobber du vanligvis som selvstendig næringsdrivende? Oppgi tiden i et snitt per uke:',
        )
        .fill('4');

    /** EØS */
    await page
        .getByRole('group', {
            name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til jobb i et annet EØS-land' }).click();
    await arbeidssituasjonSteg.fyllUtEøsArbeidstakerFrilanserDialog(page, søknadsperiode);

    await page
        .getByRole('group', {
            name: 'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til næringsvirksomhet i et annet EØS-land' }).click();
    await arbeidssituasjonSteg.fyllUtEøsSnDialog(page, søknadsperiode);
});

test('Fyll ut virksomhet dialog', async ({ page }) => {
    await page.getByLabel('Selvstendig næringsdrivende').getByLabel('Ja').check();
    await page
        .getByRole('group', { name: 'Har du flere enn én næringsvirksomhet som er aktiv?' })
        .getByLabel('Ja')
        .check();

    await page.getByRole('button', { name: 'Registrer virksomhet' }).click();
    await arbeidssituasjonSteg.fyllUtVirksomhetDialog(page, søknadsperiode);
    await page
        .getByLabel(
            'Hvor mange timer jobber du vanligvis som selvstendig næringsdrivende? Oppgi tiden i et snitt per uke:',
        )
        .fill('4');
});

test('Fyll ut eøs arbeidstaker/frilanser dialog', async ({ page }) => {
    await page
        .getByRole('group', {
            name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til jobb i et annet EØS-land' }).click();
    await arbeidssituasjonSteg.fyllUtEøsArbeidstakerFrilanserDialog(page, søknadsperiode);
});

test('Fyll ut eøs sn dialog', async ({ page }) => {
    await page
        .getByRole('group', {
            name: 'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til næringsvirksomhet i et annet EØS-land' }).click();
    await arbeidssituasjonSteg.fyllUtEøsSnDialog(page, søknadsperiode);
});
