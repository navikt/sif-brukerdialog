import { test, expect, Page } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';

const getSpørOmSluttetISøknadsperiodeFraEnv = async (page: Page): Promise<boolean> => {
    const appSettings = await page.evaluate(() => {
        const scriptTag = document.getElementById('nav:appSettings');
        if (scriptTag) {
            return JSON.parse(scriptTag.textContent || '{}');
        }
        return null;
    });
    return appSettings?.SIF_PUBLIC_FEATURE_VIS_SPM_SLUTTET_I_PERIODE === 'on';
};

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
        await page.getByLabel('Hvor mange timer jobb').fill('40');
        await gåTilOppsummering(page);
        await expect(
            page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ansattJobber normalt 40 timer per uke'),
        ).toBeVisible();
    });

    test('Slutter i søknadsperioden', async ({ page }) => {
        const spørOmSluttetISøknadsperiode = await getSpørOmSluttetISøknadsperiodeFraEnv(page);
        await page.getByTestId('er-ansatt').getByText('Nei').click();
        if (spørOmSluttetISøknadsperiode) {
            await page.getByTestId('sluttet-før-søknadsperiode').getByLabel('Nei').check();
            await page.getByLabel('Hvor mange timer jobb').fill('30');
            await gåTilOppsummering(page);
        } else {
            await page.getByLabel('Hvor mange timer jobb').fill('30');
            await gåTilOppsummering(page, false);
        }
        await expect(
            page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ikke lenger ansattJobbet normalt 30'),
        ).toBeVisible();
    });

    test('Slutter før søknadsperioden', async ({ page }) => {
        const spørOmSluttetISøknadsperiode = (test.info().project.use as any).spørOmSluttetISøknadsperiode;
        if (spørOmSluttetISøknadsperiode) {
            await page.getByTestId('er-ansatt').getByText('Nei').click();
            await page.getByTestId('sluttet-før-søknadsperiode').getByLabel('Ja').check();
            await page.getByTestId('verneplikt').getByText('Nei', { exact: true }).check(); // Vernepllikt spm kommer opp når en har ingen annen aktivitet
            await gåTilOppsummering(page, false);
            await expect(
                page.getByText('WHOA.BOA (organisasjonsnummer 947064649)Er ikke lenger ansattSluttet før 2. januar'),
            ).toBeVisible();
        }
    });
});
