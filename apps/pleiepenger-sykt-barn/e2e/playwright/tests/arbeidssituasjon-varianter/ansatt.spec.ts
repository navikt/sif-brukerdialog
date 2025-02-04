import { test, expect, Page } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

test.beforeEach(async ({ page, context }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, context, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.TIDSROM,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/arbeidssituasjon');
    await expect(page.getByRole('heading', { name: 'Arbeidssituasjonen din' })).toBeVisible();
});

const gåTilOppsummering = async (page: Page, harArbeidsaktivitet = true) => {
    if (harArbeidsaktivitet) {
        await page.getByRole('button', { name: 'Neste steg' }).click();
    }
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
};

test.describe('Arbeidssituasjoner arbeidstaker', () => {
    test('Ansatt hele søknadsperioden', async ({ page }) => {
        await page.getByTestId('er-ansatt').getByText('Ja').click();
        await page.getByLabel('Hvor mange timer jobber du').fill('40');
        await gåTilOppsummering(page);
        await expect(
            page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ansattJobber normalt 40 timer per uke'),
        ).toBeVisible();
    });
    test('Slutter i søknadsperioden', async ({ page }) => {
        await page.getByTestId('er-ansatt').getByText('Nei').click();
        await page.getByTestId('sluttet-før-søknadsperiode').getByLabel('Nei').check();
        await page.getByLabel('Hvor mange timer jobber du').fill('30');
        await gåTilOppsummering(page);

        await expect(
            page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ikke lenger ansattJobbet normalt 30'),
        ).toBeVisible();
    });
    test('Slutter før søknadsperioden', async ({ page }) => {
        await page.getByTestId('er-ansatt').getByText('Nei').click();
        await page.getByTestId('sluttet-før-søknadsperiode').getByLabel('Ja').check();
        await page.getByTestId('verneplikt').getByText('Nei', { exact: true }).check(); // Vernepllikt spm kommer opp når en har ingen annen aktivitet
        await gåTilOppsummering(page, false);
        await expect(
            page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ikke lenger ansattSluttet før 2. januar'),
        ).toBeVisible();
    });
});
