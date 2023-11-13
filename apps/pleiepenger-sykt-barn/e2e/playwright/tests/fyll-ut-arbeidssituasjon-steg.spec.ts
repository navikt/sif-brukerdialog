import { Page, expect, test } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../setup/routeUtils';
import { setNow } from '../setup/setNow';
import { getSøknadsperiode } from '../setup';
import { arbeidssituasjonSteg } from '../utfylling-utils/arbeidssituasjonSteg';

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/arbeidstid');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/omsorgstilbud');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/nattev**');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/medlemskap');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/legeerklaering');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/oppsummering');
    await expect(await page.getByRole('heading', { name: 'Oppsummering' }).isVisible()).toBeTruthy();
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnStep(page, StepID.ARBEIDSSITUASJON, getSøknadsperiode(), true);
});

test('Fyll ut komplett steg', async ({ page }) => {
    const søknadsperiode = getSøknadsperiode();
    await routeUtils.startOnStep(page, StepID.ARBEIDSSITUASJON, getSøknadsperiode(), false);
    await arbeidssituasjonSteg.fyllUtArbeidssituasjonSteg(page, søknadsperiode);
});

test.describe('Arbeidssituasjon ansatt', async () => {
    test('Ansatt hele perioden', async ({ page }) => {
        await arbeidssituasjonSteg.fyllUtAnsatt(page);
        await gåTilOppsummering(page);
        const content = await page.locator('div.summarySection', { hasText: 'Arbeidssituasjonen din' });
        await expect(await content.isVisible()).toBeTruthy();
        await expect(await content.getByText('Er ansatt').isVisible()).toBeTruthy();
        await expect(await content.getByText('Jobber normalt 37,5 timer per uke').isVisible()).toBeTruthy();
    });

    test('Slutter i søknadsperioden', async ({ page }) => {
        await arbeidssituasjonSteg.fyllUtAnsattSlutterIPerioden(page);
        await gåTilOppsummering(page);
        const content = await page.locator('div.summarySection', { hasText: 'Arbeidssituasjonen din' });
        await expect(await content.isVisible()).toBeTruthy();
        await expect(await content.getByText('Er ikke lenger ansatt').isVisible()).toBeTruthy();
        await expect(await content.getByText('Jobbet normalt 37,5 timer per uke').isVisible()).toBeTruthy();
        await expect(await content.getByText('Sluttet etter').isVisible()).toBeTruthy();
    });

    test('Sluttet før søknadsperioden', async ({ page }) => {
        await arbeidssituasjonSteg.fyllUtAnsattSluttetFørPeriode(page);
        await gåTilOppsummering(page);
        const content = await page.locator('div.summarySection', { hasText: 'Arbeidssituasjonen din' });
        await expect(await content.isVisible()).toBeTruthy();
        await expect(await content.getByText('Er ikke lenger ansatt').isVisible()).toBeTruthy();
        await expect(await content.getByText('Sluttet før').isVisible()).toBeTruthy();
    });
});
