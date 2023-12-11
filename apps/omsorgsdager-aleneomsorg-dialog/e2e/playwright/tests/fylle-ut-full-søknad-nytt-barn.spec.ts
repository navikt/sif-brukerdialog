import { expect, test } from '@playwright/test';
import { setupMockApi } from '../utils/setupMockApi';
import { setNow } from '../utils/setNow';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockApi(page);
});

test('Fyll ut full søknad nytt barn', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await page.getByRole('heading', { level: 1, name: 'Hei PRESENTABEL' });
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    await page.getByRole('heading', { level: 1, name: 'Om aleneomsorg for barn' });
    await page.getByRole('button', { name: 'Legg til barn' }).click();
    await page.getByLabel('Barnets navn').fill('Nytt Barn');
    await page
        .getByLabel('Barnets fødselsdato (Du kan ikke legge til barn som er 19 år i år eller eldre)')
        .fill('10.10.2020');
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('09847696068');
    await page.getByLabel('Barnet er mitt fosterbarn').check();
    await page.getByLabel('Legg til barn').getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Nei').check();
    await page.getByLabel('Ja').check();
    await page
        .getByRole('group', { name: 'Kryss av for barn du er alene om omsorgen for:' })
        .getByLabel('Født 10.10.2020 Nytt Barn')
        .check();
    await page
        .getByRole('group', { name: 'Kryss av for hvilke barn du har delt fast bosted for:' })
        .getByLabel('Født 20.04.2020 Barn Barnesen')
        .check();
    await page.getByRole('button', { name: 'Neste' }).click();

    await page.getByRole('heading', { level: 1, name: 'Tidspunkt for aleneomsorg' });
    await page.locator('label').filter({ hasText: 'I 2022 eller 2023' }).click();
    await page.getByLabel('Hvilken dato ble du alene om omsorgen for Nytt Barn?').fill('10.10.2022');
    await page.getByRole('button', { name: 'Neste' }).click();

    /** Oppsummering */
    await page.getByRole('heading', { level: 1, name: 'Oppsummering' });
    await page.getByLabel('Jeg bekrefter').check();

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
