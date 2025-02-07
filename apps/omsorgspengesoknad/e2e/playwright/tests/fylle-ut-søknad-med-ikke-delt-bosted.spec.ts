import { test, expect } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockApi';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await setupMockRoutes(page, context);
});

test('Fyll ut søknad med ikke delt bosted', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await page.getByRole('heading', { level: 1, name: 'Hei, PRESENTABEL' });
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Barn */
    await page.getByRole('heading', { level: 1, name: 'Barn' });
    await page.getByLabel('ALFABETISK FAGGOTTFødt 08.06.2019').check();
    await page.getByText('Ja, barnet har delt fast').click();
    await page.getByRole('group', { name: 'Har barnet kronisk/langvarig' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Har du høyere risiko for frav' }).getByLabel('Nei').check();
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Legeerklæring */
    await fyllUtLegeerklæring(page);

    /** Delt bosted */
    await fyllUtDeltBosted(page);

    /** Oppsummering */
    await page.getByRole('heading', { level: 1, name: 'Oppsummering' });
    // Kontroller verdier
    await expect(page.getByText('PRESENTABEL HOFTE')).toBeVisible();
    await expect(page.getByText('Fødselsnummer02869599258')).toBeVisible();
    await expect(page.getByText('NavnALFABETISK FAGGOTT')).toBeVisible();
    await expect(page.getByText('Fødselsdato8. juni 2019')).toBeVisible();
    await expect(page.getByText('Bor du sammen med barnet?Ja')).toBeVisible();
    await expect(
        page.getByText('Har barnet kronisk/langvarig sykdom eller funksjonshemning?Ja').isVisible(),
    ).toBeTruthy();
    await expect(page.getByText('navlogopng.png')).toBeVisible();
    await expect(page.getByText('avtale.png')).toBeVisible();

    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til omsorgspenger.',
        )
        .check();
    await page.getByRole('button', { name: 'Send søknad', exact: true }).click();

    /** Kvittering */
    await page.waitForURL('**/soknad_sendt');
    await page.getByRole('heading', {
        name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
    });
    await expect(
        page.getByRole('heading', {
            name: 'Vi har mottatt søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning',
        }),
    ).toBeVisible();
});

const fyllUtLegeerklæring = async (page: any) => {
    await page.getByRole('heading', { level: 1, name: 'Legeerklæring' });
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('input[type="file"]').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.getByText('navlogopng.png');
    await expect(listItems).toHaveCount(1);
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();
};

const fyllUtDeltBosted = async (page: any) => {
    await page.getByRole('heading', { level: 1, name: 'Delt bosted' });
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('input[type="file"]').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/avtale.png');
    const listItems = await page.getByText('avtale.png');
    await expect(listItems).toHaveCount(1);
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();
};
