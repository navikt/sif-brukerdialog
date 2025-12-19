import { expect, test } from '@playwright/test';

import { StepID } from '../../../src/app/types/StepID';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test('Arbeidsgiveroppslag feiler', async ({ page }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.TIDSROM,
        arbeidsgiveroppslagError: true,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/arbeidssituasjon');
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjonen din' })).toBeVisible();
    await expect(page.getByText('Hent arbeidsforhold feilet')).toBeVisible();
    await page.getByTestId('verneplikt').getByText('Nei', { exact: true }).check(); // Vernepllikt spm kommer opp når en har ingen annen aktivitet
    await page.getByRole('button', { name: 'Neste steg' }).click();
    /** Informasjon om arbeid skal ikke spørres om når vi ikke har arbeidsgivere, og ikke er frilansere */
    await expect(page.getByRole('heading', { name: 'Omsorgstilbud i søknadsperioden' })).toBeVisible();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
});
