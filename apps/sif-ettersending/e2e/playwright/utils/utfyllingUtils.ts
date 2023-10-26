import { Page, expect } from '@playwright/test';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending';

const velgYtelsePleiepenger = async (page: Page) => {
    await page.goto(startUrl);
    await page.getByText('Pleiepenger for sykt barn').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const startSøknad = async (page: Page) => {
    // const intro = page.locator('.navds-guide-panel__content');
    // await expect(intro).toContainText('Hei');
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtBeskrivelseSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Ettersendelse av dokumentasjon' });
    await page.getByTestId('beskrivelse').fill('Her er en kommentar');
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const fyllUtDokumenterSteg = async (page: Page) => {
    await page.getByRole('heading', { name: 'Nå skal du laste opp dokumentene dine' });
    await page.getByRole('button', { name: 'Last opp vedlegg' }).click();
    await page.getByLabel('OpplastingsikonLast opp vedlegg').setInputFiles('./e2e/playwright/files/navlogopng.png');
    const list = await page.getByTestId('uploaded-attachments-list');
    expect(list.locator('.attachmentListElement')).toHaveCount(1);
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const sendInnDokumenter = async (page: Page) => {
    await page.getByRole('heading', { name: 'Oppsummering' });
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};

const kontrollerKvittering = async (page: Page) => {
    await page.getByRole('heading', { name: 'Vi har mottatt ettersendingen av dokumenter' });
};

export const utfyllingUtils = {
    velgYtelsePleiepenger,
    startSøknad,
    fyllUtBeskrivelseSteg,
    fyllUtDokumenterSteg,
    sendInnDokumenter,
    kontrollerKvittering,
};
