import { expect, test } from '@playwright/test';
import { annenForelderMock } from '../mock-data/annenForelderMock';
import { søkerMock } from '../mock-data/søkerMock';
import { setupMockApi } from '../utils/setupMockApi';

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/velkommen';

test.beforeEach(async ({ page }) => {
    await setupMockApi(page);
});

test('Fyll ut søknad med annet barn', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await page.getByRole('heading', { level: 1, name: 'Hei PRESENTABEL' });
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Om den andre forelderen */
    await page.getByRole('heading', { level: 1, name: 'Om den andre forelderen' });
    await page.getByLabel('Skriv inn fødselsnummeret til den andre forelderen, 11 siffer').fill(annenForelderMock.fnr);
    await page.getByLabel('Skriv inn navnet til den andre forelderen').fill(annenForelderMock.navn);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Den andre forelderens situasjon */
    await page.getByRole('heading', { level: 1, name: 'Den andre forelderens situasjon' });
    await page.getByLabel('Sykdom, skade eller funksjonhemming').check();
    await page
        .getByLabel('Beskriv hva som gjør at den andre forelderen ikke kan ha tilsyn med barn:')
        .fill('Test Beskrivelse');
    await page.getByText('FraÅpne datovelger').click();
    await page.getByLabel('Fra').fill('28.02.2023');
    await page.getByLabel('Til', { exact: true }).fill('03.09.2023');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Om barn */
    await page.getByRole('heading', { level: 1, name: 'Om barn' });
    await page.getByRole('button', { name: 'Legg til barn' }).click();
    await page.getByLabel('Barnets navn').fill('Test Barn');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('18897699792');
    await page.getByLabel('Legg til barn').getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Oppsummering */
    await page.getByRole('heading', { level: 1, name: 'Oppsummering' });
    await page.getByLabel('Jeg bekrefter').check();

    await expect(
        await page
            .getByText(
                `Om deg som søker${søkerMock.fornavn} ${søkerMock.etternavn}Fødselsnummer: ${søkerMock.fødselsnummer}`,
            )
            .isVisible(),
    ).toBeTruthy();

    await expect(
        await page
            .getByText(`Om den andre forelderen${annenForelderMock.navn}Fødselsnummer: ${annenForelderMock.fnr}`)
            .isVisible(),
    ).toBeTruthy();
    await expect(
        await page.getByText('Test Barn (fnr. 18897699792)ALFABETISK FAGGOTTBarn BarnesenMock Mocknes').isVisible(),
    ).toBeTruthy();
    await expect(await page.getByText('GrunnSykdom, skade eller funksjonhemming').isVisible()).toBeTruthy();
    await expect(await page.getByText('Beskrivelse av situasjonen:Test Beskrivelse').isVisible()).toBeTruthy();
    await expect(
        await page
            .getByText(
                'Periode når den andre forelderen ikke kan ha tilsyn med barnet/barna:28. feb. 2023 - 3. sep. 2023',
            )
            .isVisible(),
    ).toBeTruthy();
    await page.getByRole('button', { name: 'Send søknad', exact: true }).click();

    /** Kvittering */
    await page.waitForURL('**/soknad_sendt');
    await expect(
        await page
            .getByRole('heading', {
                name: 'Vi har mottatt søknad om ekstra omsorgsdager',
            })
            .isVisible(),
    ).toBeTruthy();
});
