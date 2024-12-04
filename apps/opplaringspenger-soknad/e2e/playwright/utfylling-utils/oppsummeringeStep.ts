import { Page } from '@playwright/test';
import { kontrollerOpplæringOppsummering } from './2.opplæringStep';
import { kontrollerArbeidssituasjonOppsummering } from './3.arbeidssituasjonStep';

export const kontrollerOppsummering = async (page: Page) => {
    await kontrollerOpplæringOppsummering(page);
    await kontrollerArbeidssituasjonOppsummering(page);
};

export const sendInSøknad = async (page: Page) => {
    await page.getByLabel('Jeg bekrefter at').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
