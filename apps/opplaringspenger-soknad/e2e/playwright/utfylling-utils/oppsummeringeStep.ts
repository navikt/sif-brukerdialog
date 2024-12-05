import { expect, Page } from '@playwright/test';
import { kontrollerOpplæringEnPeriodeOppsummering } from './2.opplæringStep';
import { kontrollerArbeidssituasjonOppsummering } from './3.arbeidssituasjonStep';
import { kontrollerArbeidstidOppsummering } from './4.arbeidstidStep';
import { kontrollerMedlemskap } from './5.medlemskapStep';
import { kontrollerRegistrertBarnOppsummering } from './1.barnStep';

export const kontrollerOppsummering = async (page: Page) => {
    await kontrollerSøkerOppsummering(page);
    await kontrollerRegistrertBarnOppsummering(page);
    await kontrollerOpplæringEnPeriodeOppsummering(page);
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
    await expect(page.getByRole('heading', { name: 'Vi har mottatt søknad om oppl' })).toBeVisible();
};
