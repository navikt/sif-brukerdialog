import { expect, test } from '@playwright/test';
import { setupMockApi } from '../utils/setupMockApi';
import { setNow } from '../utils/setNow';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockApi(page);
});

test('Fyll ut enkel søknad', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await page.getByRole('heading', { level: 1, name: 'Hei PRESENTABEL' });
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    await page.getByRole('heading', { level: 1, name: 'Om aleneomsorg for barn' });
    await page.getByLabel('Mock Mocknes').check();
    await page.getByLabel('Nei').check();
    await page.getByRole('button', { name: 'Neste' }).click();

    await page.getByRole('heading', { level: 1, name: 'Tidspunkt for aleneomsorg' });
    await page.getByLabel('I 2021 eller tidligere').check();
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
