import { SøknadRoutes } from '@app/søknad/config/SøknadRoutes';
import { expect, test } from '@playwright/test';

import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

const rootUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/melding/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('ukjent arbeidsforhold med kun ferie valgt', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgiver-ikke-i-sak');
    await page.goto(rootUrl);

    /** Velkommen: kun ferie */
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ukjent arbeidsforhold */
    await page.getByTestId('ukjentArbeidsforhold_a_947064642').getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('50');
    await page.getByLabel('Hovedinnhold').click();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid (trigget av Ja-svar på ukjent arbeidsforhold) */
    await page.getByTestId('REDUSERT').check();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByTestId('aktivitet_a_947064642').getByLabel('Jeg ønsker å endre flere uker').check();
    await page.getByTestId('aktivitet_a_947064642').getByLabel('Velg alle uker i tabellen').click();
    await page.getByTestId('endre-flere-uker-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('50');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Endre uke 5 (29.01.2024 - 31.').click();
    await page.getByTestId('toggle-timer').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('5');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Endre uke 5 (01.02.2023 - 05.').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('5');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ferie */
    await expect(page).toHaveTitle('Ferie i pleiepengeperioden - Endringsmelding for pleiepenger sykt barn');
    await page.getByTestId('leggTilFerieKnapp').click();
    await page.getByLabel('Fra og med').click();
    await page.getByLabel('Fra og med').fill('19.01.2023');
    await page.getByLabel('Til og med').click();
    await page.getByLabel('Til og med').fill('19.01.2023');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering */
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt til saken din' })).toBeVisible();
});

test('ukjent arbeidsforhold med kun omsorgstilbud valgt', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgiver-ikke-i-sak');
    await page.goto(rootUrl);

    /** Velkommen: kun omsorgstilbud */
    await page.getByText('Tid i omsorgstilbud').click();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Ukjent arbeidsforhold */
    await page.getByTestId('ukjentArbeidsforhold_a_947064642').getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('50');
    await page.getByLabel('Hovedinnhold').click();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Arbeidstid (trigget av Ja-svar på ukjent arbeidsforhold) */
    await page.getByTestId('REDUSERT').check();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByRole('button', { name: 'Vis flere uker' }).click();
    await page.getByTestId('aktivitet_a_947064642').getByLabel('Jeg ønsker å endre flere uker').check();
    await page.getByTestId('aktivitet_a_947064642').getByLabel('Velg alle uker i tabellen').click();
    await page.getByTestId('endre-flere-uker-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('50');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Endre uke 5 (29.01.2024 - 31.').click();
    await page.getByTestId('toggle-timer').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('5');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByLabel('Endre uke 5 (01.02.2023 - 05.').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('5');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Tilsynsordning/omsorgstilbud */
    await page.getByRole('button', { name: 'Legg til endring for en periode' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).first().click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByRole('button', { name: 'mandag 6' }).click();
    await page.getByRole('button', { name: 'Åpne datovelger' }).nth(1).click();
    await page.getByRole('button', { name: 'fredag 24' }).click();
    await page.getByRole('group', { name: 'Mandager' }).getByLabel('Timer').fill('1');
    await page.getByRole('group', { name: 'Onsdager' }).getByLabel('Timer').fill('5');
    await page.getByRole('group', { name: 'Fredager' }).getByLabel('Timer').fill('3');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    /** Oppsummering */
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Melding om endring er lagt til saken din' })).toBeVisible();
});
