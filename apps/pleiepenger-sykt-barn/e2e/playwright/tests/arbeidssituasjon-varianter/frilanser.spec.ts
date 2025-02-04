import { test, expect } from '@playwright/test';
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

test.describe('Fosterhjemsgodtgjørelse eller omsorgsstønad ', () => {
    test('Mottar ikke fosterhjemsgodtgjørelse eller omsorgsstønad', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Nei').check();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Mottar ikke fosterhjemgodtgjø')).toBeVisible();
    });
    test('Starter og slutter å motta i perioden', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Mottar du denne stønaden' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Mottar du denne stønaden' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Starter stønaden eller godtgj' }).getByLabel('Ja').check();
        await page.getByRole('button', { name: 'Åpne datovelger' }).click();
        await page.getByLabel('mandag 2', { exact: true }).click();
        await page.getByRole('group', { name: 'Stopper stønaden eller godtgj' }).getByLabel('Ja').check();
        await page
            .locator('div')
            .filter({ hasText: /^Sluttdato:Åpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByTestId('stønadGodtgjørelse-sluttdato').getByLabel('tirsdag 3', { exact: true }).click();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);

        const summary = await page.getByText(
            'Omsorgsstønad eller fosterhjemsgodtgjørelseMottar stønad eller godtgjørelsen i',
        );
        await expect(
            summary.getByText('Mottar stønad eller godtgjørelsen i deler av perioden jeg søker om'),
        ).toBeVisible();
        await expect(summary.getByText('Startet 2. januar')).toBeVisible();
        await expect(summary.getByText('Sluttet 3. januar')).toBeVisible();
    });
});
test.describe('Frilanser', () => {
    test('Er ikke frilanser', async ({ page }) => {
        await page.getByTestId('arbeidssituasjonFrilanser').getByText('Nei', { exact: true }).nth(1).click();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Er ikke frilanser og får ikke')).toBeVisible();
    });

    test('Er kun frilanser', async ({ page }) => {
        await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
        await page.getByLabel('Jeg jobber som frilanser').check();
        await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
        await page.getByTestId('erFortsattFrilanser').getByText('Ja').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').fill('33');

        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByLabel('Frilans og oppdrag som regnes').getByText('Jeg jobber ikke').click();

        await routeUtils.gåTilOppsummeringFraJobbISøknadsperioden(page);
        const summary = await page.getByTestId('frilans-summary');
        await expect(summary.getByText('Jobber som frilanser')).toBeVisible();
        await expect(summary.getByText('Jobber normalt 33 timer per')).toBeVisible();
        await expect(summary.getByText('Startet som frilanser før 1. oktober')).toBeVisible();
    });

    test('Mottar kun honorar - mister honorar', async ({ page }) => {
        await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
        await page.getByLabel('Jeg mottar honorar').check();
        await page.getByTestId('misterHonorar').getByText('Ja').click();
        await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
        await page.getByTestId('erFortsattFrilanser').getByText('Ja').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').fill('33');

        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByLabel('Frilans og oppdrag som regnes').getByText('Jeg jobber ikke').click();

        await routeUtils.gåTilOppsummeringFraJobbISøknadsperioden(page);
        const summary = await page.getByTestId('frilans-summary');
        await expect(summary.getByText('Mottar honorar')).toBeVisible();
        await expect(summary.getByText('Mister honorar i sø')).toBeVisible();
        await expect(summary.getByText('Jobber normalt 33 timer per')).toBeVisible();
        await expect(summary.getByText('Startet som frilanser før 1. oktober')).toBeVisible();
    });
    test('Mottar kun honorar - mister ikke honorar', async ({ page }) => {
        await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
        await page.getByLabel('Jeg mottar honorar').check();
        await page.getByTestId('misterHonorar').getByText('Nei').click();
        await page.getByTestId('typedFormikForm-submitButton').click();

        await routeUtils.gåTilOppsummeringFraJobbISøknadsperioden(page);
        const summary = await page.getByTestId('frilans-summary');
        await expect(summary.getByText('Mottar honorar')).toBeVisible();
        await expect(summary.getByText('Mister ikke honorar i sø')).toBeVisible();
    });
    test('Er frilanser og mottar honorar', async ({ page }) => {
        await page.getByRole('group', { name: 'Jobber du som frilanser eller' }).getByLabel('Ja').check();
        await page.getByText('Jeg jobber både som frilanser').check();
        await page.getByRole('group', { name: 'Startet du som frilanser før' }).getByLabel('Ja').check();
        await page.getByTestId('erFortsattFrilanser').getByText('Ja').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').click();
        await page.getByTestId('arbeidssituasjonFrilanser').getByLabel('Hvor mange timer jobber du').fill('33');

        await page.getByTestId('typedFormikForm-submitButton').click();
        await page.getByLabel('Frilans og oppdrag som regnes').getByText('Jeg jobber ikke').click();

        await routeUtils.gåTilOppsummeringFraJobbISøknadsperioden(page);
        const summary = await page.getByTestId('frilans-summary');
        await expect(summary.getByText('Jobber som frilanser og mottar honorar')).toBeVisible();
        await expect(summary.getByText('Jobber normalt 33 timer per')).toBeVisible();
        await expect(summary.getByText('Startet som frilanser før 1. oktober')).toBeVisible();
    });
});
