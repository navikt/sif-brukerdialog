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

const fyllUtdokumentTypeSteg = async (page: Page, legeerklæring: boolean, barnFnr?: string) => {
    await expect(page.getByRole('heading', { name: 'Hva skal du ettersende?', level: 1 })).toBeVisible();

    await page.getByRole('button').getByText('Neste').click();
    await expect(page.getByRole('heading', { name: 'Feil i skjema' })).toBeVisible();

    if (legeerklæring) {
        await page.getByText('Legeerklæring').click();
    } else {
        await page.getByText('Annet').click();
    }

    await page.getByRole('button').getByText('Neste').click();
    await expect(page.getByText('Feil i skjema')).toBeVisible();

    if (barnFnr) {
        await page.getByText('Ettersendelse gjelder et annet barn').click();
        await page.getByRole('button').getByText('Neste').click();
        await expect(page.getByText('Feil i skjema')).toBeVisible();

        await page.getByText('Barnets fødselsnummer/D-nummer').fill('12345678123');
        await page.getByRole('button').getByText('Neste').click();
        await expect(page.getByText('Feil i skjema')).toBeVisible();

        await page.getByText('Barnets fødselsnummer/D-nummer').fill(barnFnr);
    } else {
        await page.getByText('ALFABETISK FAGGOTT').click();
    }

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

const kontrollerOppsummeringPPSyktBarn = async (page: Page, legeerklæring: boolean, barnFnr?: string) => {
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByTestId('oppsummering').getByText('Søknad om pleiepenger for')).toBeVisible();

    if (legeerklæring) {
        await expect(page.getByText('Hva skal du ettersende?')).toBeVisible();
        await expect(page.getByText('ALFABETISK FAGGOTT (født 08.06.2019)')).toBeVisible();
    }

    if (barnFnr) {
        await expect(page.getByText('Hvilket barn gjelder')).toBeVisible();
        await expect(page.getByTestId('fnr-barn')).toHaveText(`Fødselsnummer: ${barnFnr}`);
    }

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

const kontrollerKvitteringLegeerklæring = async (page: Page) => {
    await page.waitForURL('**/dokumenter-sendt');
    await expect(page.getByRole('heading', { name: 'Vi har mottatt legeerklæring' })).toBeVisible();
};

export const utfyllingUtils = {
    velgYtelsePleiepenger,
    startSøknad,
    fyllUtdokumentTypeSteg,
    fyllUtDokumenterSteg,
    kontrollerOppsummeringPPSyktBarn,
    sendInnDokumenter,
    kontrollerKvittering,
    kontrollerKvitteringLegeerklæring,
};
