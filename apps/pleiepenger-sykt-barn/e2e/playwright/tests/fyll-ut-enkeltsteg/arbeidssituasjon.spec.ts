import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.TIDSROM,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/arbeidssituasjon');
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjonen din' })).toBeVisible();
});

test.describe('Arbeidssituasjon', () => {
    test('Fyll ut arbeidssituasjon', async ({ page }) => {
        await page.getByTestId('er-ansatt').getByText('Ja').click();
        await page.getByLabel('Hvor mange timer jobber du').fill('20');
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Mottar du denne stønaden' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Mottar du denne stønaden' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Starter stønaden eller godtgj' }).getByLabel('Ja').check();
        await page.getByRole('button', { name: 'Åpne datovelger' }).click();
        await page.getByLabel('tirsdag 3', { exact: true }).click();
        await page.getByRole('group', { name: 'Stopper stønaden eller godtgj' }).getByLabel('Ja').check();
        await page
            .locator('div')
            .filter({ hasText: /^Sluttdato:Åpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByTestId('stønadGodtgjørelse-sluttdato').getByLabel('fredag 13').click();
        await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
        await page.getByLabel('Jeg jobber både som frilanser').check();
        await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
        await page.getByTestId('erFortsattFrilanser').getByText('Ja').click();
        await page.getByTestId('erFortsattFrilanser').getByText('Nei').click();
        await page
            .locator('div')
            .filter({ hasText: /^Når sluttet du å jobbe som frilanser\?Åpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByTestId('er-frilanser-sluttdato').getByLabel('søndag 1', { exact: true }).click();
        await page.getByRole('group', { name: 'Startet du som frilanser før' }).locator('span').nth(3).click();
        await page
            .locator('div')
            .filter({ hasText: /^Når startet du å jobbe som frilanser\?Åpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByLabel('mandag 7').click();
        await page.getByLabel('Hvor mange timer jobbet du').click();
        await page.getByLabel('Hvor mange timer jobbet du').fill('5');
        await page.getByLabel('Hvor mange timer jobbet du').press('Tab');
        await page.getByTestId('arbeidssituasjonSelvstendig').getByLabel('Ja').check();
        await page.getByTestId('har-flere-virksomheter').getByText('Nei').click();
        await page.getByRole('button', { name: 'Registrer virksomhet' }).click();
        await page.getByText('Jordbruker').click();
        await page.getByLabel('Hva heter virksomheten?').click();
        await page.getByLabel('Hva heter virksomheten?').fill('Testvirk');
        await page.getByLabel('Opplysninger om den eldste').getByLabel('Ja').check();
        await page.getByLabel('Hva er organisasjonsnummeret?').click();
        await page.getByLabel('Hva er organisasjonsnummeret?').fill('991012133');
        await page
            .locator('div')
            .filter({ hasText: /^StartdatoÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('dialog', { name: 'Velg dato' }).getByLabel('År').selectOption('2018');
        await page.getByLabel('onsdag 17').click();
        await page.getByText('Er pågående').click();
        await page.getByRole('group', { name: 'Har du hatt en varig endring' }).getByLabel('Ja').check();
        await page
            .locator('div')
            .filter({ hasText: /^Oppgi dato for endringenÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'tirsdag 15' }).click();
        await page.getByLabel('Oppgi næringsinntekten din').click();
        await page.getByLabel('Oppgi næringsinntekten din').fill('20000');
        await page.getByLabel('Oppgi næringsinntekten din').press('Tab');
        await page.getByLabel('Her kan du skrive kort hva').fill('Det endret seg');
        await page.getByRole('group', { name: 'Har du regnskapsfører?' }).getByLabel('Ja').check();
        await page.getByLabel('Oppgi navnet til regnskapsfø').click();
        await page.getByLabel('Oppgi navnet til regnskapsfø').fill('Regn Skap');
        await page.getByLabel('Oppgi telefonnummeret til').click();
        await page.getByLabel('Oppgi telefonnummeret til').fill('11223344');
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByTestId('arbeidssituasjonSelvstendig').getByLabel('Hvor mange timer jobber du').click();
        await page.getByTestId('arbeidssituasjonSelvstendig').getByLabel('Hvor mange timer jobber du').fill('5');
        await page.getByTestId('arbeidssituasjonOpptjeningUtland').getByLabel('Ja').check();
    });
    test('Jobb i annet EØS land', async ({ page }) => {
        /** Jobb i annet EØS land */
        await page.getByTestId('arbeidssituasjonOpptjeningUtland').getByLabel('Ja').click();
        await page.getByRole('button', { name: 'Legg til jobb i et annet EØS-' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^Fra og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByLabel('mandag 22').click();
        await page
            .locator('div')
            .filter({ hasText: /^Til og medÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'Gå til neste måned' }).click();
        await page.getByRole('button', { name: 'onsdag 24' }).click();
        await page.getByLabel('Velg land').selectOption('BGR');
        await page.getByText('Arbeidstaker', { exact: true }).click();
        await page.getByLabel('Skriv inn navnet på').click();
        await page.getByLabel('Skriv inn navnet på').fill('frt');
        await page.getByRole('button', { name: 'Ok' }).click();
    });

    test('Næringsvirksomhet i et annet EØS-land', async ({ page }) => {
        await page.getByTestId('arbeidssituasjonUtenlandskNæring').getByText('Ja').click();
        await page.getByRole('button', { name: 'Legg til næringsvirksomhet i' }).click();
        await page.getByText('Jordbruker', { exact: true }).click();
        await page.getByLabel('Skriv inn navnet på').click();
        await page.getByLabel('Skriv inn navnet på').fill('Jorden');
        await page.getByLabel('I hvilket land var Jorden').selectOption('BGR');
        await page.getByLabel('Skriv inn virksomhetens').click();
        await page.getByLabel('Skriv inn virksomhetens').fill('1234');
        await page
            .locator('div')
            .filter({ hasText: /^StartdatoÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'mandag 7' }).click();
        await page
            .locator('div')
            .filter({ hasText: /^SluttdatoÅpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
        await page.getByRole('button', { name: 'fredag 30' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
    });
});
