import { Page } from '@playwright/test';

const ansattHelePerioden = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Stemmer det at du er ansatt hos SJOKKERENDE ELEKTRIKER i perioden du søker for?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .fill('37,5');
};

const slutterIPerioden = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Stemmer det at du er ansatt hos SJOKKERENDE ELEKTRIKER i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('group', { name: 'Sluttet du hos SJOKKERENDE ELEKTRIKER før' }).getByLabel('Nei').check();
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .fill('37,5');
};

const sluttetFørPeriode = async (page: Page) => {
    await page
        .getByRole('group', { name: 'Stemmer det at du er ansatt hos SJOKKERENDE ELEKTRIKER i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('group', { name: 'Sluttet du hos SJOKKERENDE ELEKTRIKER før' }).getByLabel('Ja').check();
};

export const fyllUtAnsattArbeidssituasjon = {
    ansattHelePerioden,
    slutterIPerioden,
    sluttetFørPeriode,
};
