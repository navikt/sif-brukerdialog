import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

export const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending';

const velgYtelsePleiepenger = async (page: Page) => {
    await page.goto(startUrl);
    await page.getByLabel('Pleiepenger for sykt barn').click();
    await page.getByRole('button').getByText('Gå videre').click();
};

const startSøknad = async (page: Page) => {
    await page.getByTestId('bekreft-label').click();
    await page.getByRole('button').getByText('Start ettersendelse').click();
};

const fyllUtBeskrivelseSteg = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Ettersendelse av dokumentasjon', level: 1 })).toBeVisible();
    await page.getByText('Annet').click();
    await page.getByTestId('beskrivelse').fill('Her er en kommentar');
    await page.getByRole('button').getByText('Neste').click();
};

const fyllUtDokumenterSteg = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Nå skal du laste opp dokumentene dine' })).toBeVisible();

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('#dokumenter-input').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = await page.locator('.attachmentListElement');
    await expect(listItems).toHaveCount(1);
    await page.getByRole('button').getByText('Neste').click();
};

const kontrollerOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
};

const sendInnDokumenter = async (page: Page) => {
    await page.getByTestId('bekreft-label').click();
    await page.getByRole('button').getByText('Send inn').click();
};

const kontrollerKvittering = async (page: Page) => {
    await page.waitForURL('**/dokumenter-sendt');
    await expect(page.getByRole('heading', { name: 'Vi har mottatt ettersendingen av dokumenter' })).toBeVisible();
};

export const utfyllingUtils = {
    velgYtelsePleiepenger,
    startSøknad,
    fyllUtBeskrivelseSteg,
    fyllUtDokumenterSteg,
    kontrollerOppsummering,
    sendInnDokumenter,
    kontrollerKvittering,
};
