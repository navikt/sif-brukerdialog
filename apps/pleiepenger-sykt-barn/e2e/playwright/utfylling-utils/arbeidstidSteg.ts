/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '@playwright/test';

export const fyllUtArbeidstidSteg = async (page: Page) => {
    await page
        .getByLabel('SJOKKERENDE ELEKTRIKER')
        .locator('label')
        .filter({ hasText: 'Jeg kombinerer delvis jobb med pleiepenger' })
        .click();
    await page.getByLabel('Nei, det varierer').check();
    await page.getByLabel('11.09.2023 - 17.09.2023').fill('4');
    await page.getByLabel('18.09.2023 - 24.09.2023').fill('5');
    await page.getByLabel('25.09.2023 - 01.10.2023').fill('0');
    await page.getByLabel('02.10.2023 - 08.10.2023').fill('20');
    await page.getByLabel('09.10.2023 - 09.10.2023').fill('6');
    await page.getByLabel('Frilans og oppdrag som regnes som frilansoppdrag').getByText('Jeg jobber ikke').click();
    await page
        .getByLabel('Selvstendig næringsdrivende')
        .getByText('Jeg jobber som normalt, og har ikke fravær på grunn av pleiepenger')
        .click();
};

export const arbeidstidSteg = {
    fyllUtArbeidstidSteg,
};
