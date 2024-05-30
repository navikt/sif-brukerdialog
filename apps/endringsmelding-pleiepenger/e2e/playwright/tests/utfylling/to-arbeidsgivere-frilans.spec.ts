import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { routeUtils } from '../../utils/routeUtils';
import { SøknadRoutes } from '../../../../src/app/søknad/config/SøknadRoutes';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('test', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.VELKOMMEN, 'arbeidsgivere-og-frilanser');
    await page.goto(
        'http://localhost:8080/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger/melding/velkommen',
    );

    await page.getByRole('button', { name: 'Én arbeidsgiver - en periode' }).click();
    await page.getByText('To arbeidsgivere + frilans').click();
    await page.getByRole('button', { name: 'Velg' }).click();
    await page.getByTestId('endreLovbestemtFerie').check();
    await page.getByTestId('endreArbeidstid').check();
    await page.getByLabel('Jeg bekrefter at jeg har').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('aktivitet_a_947064649').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('aktivitet_a_947064649').getByTestId('uke_44').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('50');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('aktivitet_a_947064640').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('dateRangeAccordion_1_header').click();
    await page.getByRole('cell', { name: 'Endre uke 4 (23.01.2023 - 29.' }).click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('prosent-verdi').fill('5');
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByTestId('uke_5').getByTestId('endre-button').click();
    await page.getByTestId('prosent-verdi').click();
    await page.getByTestId('toggle-timer').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('2');
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByTestId('aktivitet_frilanser').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('aktivitet_frilanser').getByText('- 04.12.2022').click();
    await page.getByTestId('aktivitet_frilanser').getByRole('button', { name: 'Vis alle uker' }).click();
    await page.getByTestId('aktivitet_frilanser').getByTestId('uke_7').getByTestId('endre-button').click();
    await page.getByTestId('timer-verdi').click();
    await page.getByTestId('timer-verdi').fill('2');
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await expect(page.getByTestId('uke_44').getByTestId('arbeidstid-faktisk')).toContainText(
        '8 t. 45 m. (50 %)Endret fra 7 t. 30 m.',
    );
    await expect(page.getByTestId('uke_4').getByTestId('arbeidstid-faktisk')).toContainText(
        '1 t. 55 m. (5 %)Endret fra 22 t. 30 m.',
    );
    await expect(page.getByTestId('uke_5').getByTestId('arbeidstid-faktisk')).toContainText(
        '2 t. 0 m.Endret fra 22 t. 30 m.',
    );
    await expect(page.getByTestId('uke_7').getByTestId('arbeidstid-faktisk')).toContainText(
        '2 t. 0 m.Endret fra 15 t. 0 m.',
    );
    await expect(page.getByText('Det er ikke registrert noen')).toBeVisible();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByTestId('kvittering-heading')).toBeVisible();
});
