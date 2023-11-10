/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page } from '@playwright/test';

export const fyllUtOmsorgstilbudSteg = async (page: Page) => {
    await page
        .getByRole('group', {
            name: 'Har barnet vært fast og regelmessig i skole/barnehage, eller andre omsorgstilbud, fra datoen du søker om og frem til nå?',
        })
        .getByLabel('Ja, i hele eller deler av perioden')
        .check();

    await page
        .getByRole('group', {
            name: 'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud fremover i tid?',
        })
        .getByLabel('Ja, i hele eller deler av perioden')
        .check();

    await page
        .getByRole('group', {
            name: 'Er tiden barnet er i omsorgstilbudet lik hver uke?',
        })
        .getByLabel('Det varierer fra uke til uke')
        .check();

    await page.getByText('Ja, i hele eller deler av perioden').first().click();
    await page.getByText('Det varierer fra uke til uke').click();
    await page.getByLabel('Omsorgstilbud september 2023').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByRole('button', { name: 'mandag 25. sep. 2023' }).click();
    await page.getByLabel('Timer').fill('5');
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByLabel('Omsorgstilbud oktober 2023').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByRole('button', { name: 'mandag 09. okt. 2023' }).click();
    await page.getByText('Gjenta disse timene for flere dager').click();
    await page.getByLabel('Timer').fill('4');
    await page.getByLabel('Alle dager i oktober 2023').check();
    await page.getByRole('button', { name: 'Lagre' }).click();
};

export const omsorgstilbudSteg = {
    fyllUtOmsorgstilbudSteg,
};
