import { Page, expect, test } from '@playwright/test';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import { routeUtils } from '../utils/routeUtils';
import { setNow as setNow } from '../utils/setNow';

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.resumeFromRoute(page, SøknadRoutes.OPPLYSNINGER_OM_PLEIETRENGENDE);
});

test('Viser riktig informasjon fra mellomlagring', async ({ page }) => {
    await expect(page).toHaveTitle('Om personen du pleier - Søknad om pleiepenger i livets sluttfase');
    await expect(page.getByRole('textbox', { name: 'Navn på den du skal pleie' })).toHaveValue('Test Testesen');
    await expect(page.getByRole('textbox', { name: 'Fødselsnummer/D-nummer' })).toHaveValue('27857798800');

    const radioNei = await page
        .getByRole('group', { name: 'Er dere flere som skal dele på pleiepengene?' })
        .getByRole('radio', { name: 'Nei' });

    await expect(radioNei).toBeChecked();
});

test('Kan fylle ut informasjon om person som ikke har fødselsnummer eller D-nummer', async ({ page }) => {
    await page.getByLabel('Personen har ikke fødselsnummer/D-nummer').check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('År').selectOption('1994');
    await page.getByLabel('Måned', { exact: true }).selectOption('3');
    await page.getByLabel('4. april (mandag)').click();
    await page.getByText('Annet').click();
    await page.getByRole('button', { name: 'Last opp ID' }).click();

    await expect(await page.locator('.attachmentListElement')).toHaveCount(0);
    await page.getByLabel('OpplastingsikonLast opp ID').setInputFiles('./e2e/playwright/files/navlogopng.png');
    await expect(await page.locator('.attachmentListElement')).toHaveCount(1);
    await expect(await page.getByText('navlogopng.png').isVisible()).toBeTruthy();

    await gåTilOppsummering(page);
    await expect(await page.getByRole('heading', { name: 'Oppsummering' }).isVisible()).toBeTruthy();

    /** Kontroller oppsummering */
    expect(await page.getByText('Test Testesen').isVisible()).toBeTruthy();
    expect(await page.getByText('Fødselsdato: 04.04.1994').isVisible()).toBeTruthy();
    expect(await page.locator('a').getByText('navlogopng.png').nth(0).isVisible()).toBeTruthy();
    expect(
        await page.getByText('Oppgitt grunn for at han/hun ikke har fødselsnummer eller D-nummer: Annet').isVisible(),
    ).toBeTruthy();
    expect(await page.getByText('Er dere flere som skal dele på pleiepengene?Nei').isVisible()).toBeTruthy();
});

test('Validering av navn', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Navn på den du skal pleie' }).fill('');
    await page.getByRole('button', { name: 'Neste' }).click();

    const errorMessages = await page.getByLabel('Feil i skjema');
    expect(await errorMessages.isVisible()).toBeTruthy();
    expect(await errorMessages.getByText('Du må skrive inn navnet til den du pleier.').isVisible()).toBeTruthy();
});
