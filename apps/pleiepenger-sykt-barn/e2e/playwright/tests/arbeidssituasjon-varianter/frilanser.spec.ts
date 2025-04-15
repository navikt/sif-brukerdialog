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

test.describe('Fosterhjemsgodtgjørelse ', () => {
    test('Mottar ikke fosterhjemsgodtgjørelse', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Nei').check();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Mottar ikke fosterhjemsgodtgjø')).toBeVisible();
    });
    test('Mottar fosterhjemsgodtgjørelse, er frikjøpt ', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Er du frikjøpt' }).getByLabel('Ja').check();
        await page.getByRole('textbox', { name: 'Beskriv detaljer om frikjøp' }).fill('detaljer om frikjøp');
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Mottar fosterhjemsgodtgjø')).toBeVisible();
        await expect(page.getByText('Er frikjøpt fra jobb')).toBeVisible();
        await expect(page.getByText('detaljer om frikjøp', { exact: true })).toBeVisible();
    });
    test('Mottar fosterhjemsgodtgjørelse - er ikke frikjøpt - mottar hele perioden', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Er du frikjøpt' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Mottar du denne godtgjørelsen gjennom' }).getByLabel('Ja').check();
    });
    test('Mottar fosterhjemsgodtgjørelse - er ikke frikjøpt - mottar deler av perioden', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Er du frikjøpt' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Mottar du denne godtgjørelsen gjennom' }).getByLabel('Nei').check();
        await page.getByRole('group', { name: 'Starter godtgjørelsen' }).getByLabel('Ja').check();
        await page.getByRole('button', { name: 'Åpne datovelger' }).click();
        await page.getByLabel('mandag 2', { exact: true }).click();
        await page.getByRole('group', { name: 'Stopper godtgjørelsen' }).getByLabel('Ja').check();
        await page
            .locator('div')
            .filter({ hasText: /^Sluttdato:Åpne datovelger$/ })
            .getByRole('button')
            .click();
        await page.getByTestId('fosterhjemsgodtgjørelse-sluttdato').getByLabel('tirsdag 3', { exact: true }).click();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        const summary = await page.getByText('FosterhjemsgodtgjørelseMottar');
        await expect(
            summary.getByText('Mottar fosterhjemsgodtgjørelsen i deler av perioden jeg søker om'),
        ).toBeVisible();
        await expect(summary.getByText('Startet 2. januar')).toBeVisible();
        await expect(summary.getByText('Sluttet 3. januar')).toBeVisible();
    });
});

test.describe('Omsorgsstønad', () => {
    test('Mottar ikke omsorgsstønad', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du omsorgss' }).getByLabel('Nei').check();
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Mottar ikke omsorgss')).toBeVisible();
    });
    test('Mottar omsorgsstønad i hele perioden', async ({ page }) => {
        await page.getByRole('group', { name: 'Mottar du omsorgss' }).getByLabel('Ja').check();
        await page.getByRole('group', { name: 'Mottar du denne omsorgsstønaden gjennom' }).getByLabel('Ja').check();
        await page.getByRole('textbox', { name: 'Hvor mange timer i uken har' }).fill('5');
        await routeUtils.gåTilOppsummeringFraArbeidssituasjon(page);
        await expect(page.getByText('Mottar omsorgsstønaden gjennom hele perioden jeg søker om')).toBeVisible();
        await expect(page.getByText('Mottar 5 timer per uken i snitt')).toBeVisible();
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
