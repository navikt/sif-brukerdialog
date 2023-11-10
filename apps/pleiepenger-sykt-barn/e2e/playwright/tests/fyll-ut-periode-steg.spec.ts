import { Page, expect, test } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { periodeSteg } from '../utfylling-utils/periodeSteg';
import { checkA11y, getSøknadsperiode } from '../setup';
import { routeUtils } from '../setup/routeUtils';
import { setNow } from '../setup/setNow';

const { fyllUtPeriodeStegKomplett } = periodeSteg;

const gåTilOppsummering = async (page: Page) => {
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/arbeidssituasjon');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/arbeidstid');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();
    await page.waitForURL('**/omsorgstilbud');
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
    await routeUtils.startOnStep(page, StepID.TIDSROM, getSøknadsperiode());
    await expect(page.getByRole('heading', { name: 'Perioden med pleiepenger' })).toBeVisible();
});

test('Legg til ferie og utenlandsopphold', async ({ page }) => {
    await fyllUtPeriodeStegKomplett(page, getSøknadsperiode());

    await checkA11y(page);
    await gåTilOppsummering(page);

    /** Sjekk periode */
    await expect(page.getByText('Periode11. september 2023 - 9. oktober 2023')).toBeVisible();

    /** Sjekk utenlandsopphold */
    await expect(
        page
            .locator('div')
            .filter({ hasText: /^Skal du være i utlandet i perioden\?Ja$/ })
            .first(),
    ).toBeVisible();
    await expect(page.getByText('14. sep. 2023 - 17. sep. 2023Afghanistan')).toBeVisible();
    await expect(
        page.getByText('Periode(r) barnet er innlagt:15. sep. 2023 - 15. sep. 2023For norsk offentlig re'),
    ).toBeVisible();

    /** Sjekk ferie */
    await expect(page.getByText('Skal du ta ut ferie i perioden?Ja')).toBeVisible();
    await expect(
        page
            .locator('li')
            .filter({ hasText: /^14\. sep\. 2023 - 17\. sep\. 2023$/ })
            .locator('span'),
    ).toBeVisible();
});
