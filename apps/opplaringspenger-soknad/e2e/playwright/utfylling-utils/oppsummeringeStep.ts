import { expect, Page } from '@playwright/test';
import { kontrollerOpplæringOppsummering } from './2.opplæringStep';
import { kontrollerArbeidssituasjonOppsummering } from './3.arbeidssituasjonStep';
import { kontrollerArbeidstidOppsummering } from './4.arbeidstidStep';
import { kontrollerMedlemskap } from './5.medlemskapStep';
import { kontrollerBarnOppsummering } from './1.barnStep';

export const kontrollerOppsummering = async (page: Page) => {
    await kontrollerSøkerOppsummering(page);
    await kontrollerBarnOppsummering(page);
    await kontrollerOpplæringOppsummering(page);
    await kontrollerArbeidssituasjonOppsummering(page);
    await kontrollerArbeidstidOppsummering(page);
    await kontrollerMedlemskap(page);
};

const kontrollerSøkerOppsummering = async (page: Page) => {
    await expect(page.getByRole('heading', { name: 'Om deg' })).toBeVisible();
    await expect(page.getByText('NavnPRESENTABEL HOFTE')).toBeVisible();
    await expect(page.getByText('Fødselsnummer02869599258')).toBeVisible();
};

export const sendInnSøknad = async (page: Page) => {
    await page.getByLabel('Jeg bekrefter at').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
