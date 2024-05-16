import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('test', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgiver-ikke-i-sak');
    await page.goto(
        'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/melding/velkommen',
    );
    await page.getByTestId('endreArbeidstid').check();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('ukjentArbeidsforhold_a_947064642').getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('50');
    await page.getByLabel('Hovedinnhold').click();
    await page.getByTestId('ukjentArbeidsforhold_a_947064643').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
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
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByTestId('kvittering-heading')).toBeVisible();
});
