import { DateRange } from '@navikt/sif-common-utils/lib';
import { Page, expect, test } from '@playwright/test';
import { addDays } from 'date-fns';
import { StepID } from '../../../src/app/types/StepID';
import { periodeSteg } from '../utfylling-utils/periodeSteg';
import { checkA11y, getSøknadsperiode } from '../utils';
import { routeUtils } from '../utils/routeUtils';
import { setNow } from '../utils/setNow';

const søknadsperiode = getSøknadsperiode();

const { leggTilFerie, leggTilUtenlandsopphold, velgPeriode } = periodeSteg;

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
    await routeUtils.startOnStep(page, StepID.TIDSROM);
    await expect(page.getByRole('heading', { name: 'Perioden med pleiepenger' })).toBeVisible();
});

test('Velg periode', async ({ page }) => {
    await velgPeriode(page, søknadsperiode);
    await checkA11y(page);
});

test('Legg til reise til utlandet', async ({ page }) => {
    const periodeUtenlandsopphold: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 6),
    };
    const innlagtPeriode: DateRange = {
        from: addDays(søknadsperiode.from, 4),
        to: addDays(søknadsperiode.from, 5),
    };
    await velgPeriode(page, søknadsperiode);
    await leggTilUtenlandsopphold(page, periodeUtenlandsopphold, innlagtPeriode);
    await checkA11y(page);
});

test('Legg til ferie', async ({ page }) => {
    const ferieperiode: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 6),
    };
    await velgPeriode(page, søknadsperiode);
    await leggTilFerie(page, ferieperiode);
    await checkA11y(page);
    await gåTilOppsummering(page);
});

test('Legg til ferie og utenlandsopphold', async ({ page }) => {
    const periodeUtenlandsopphold: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 6),
    };
    const innlagtPeriode: DateRange = {
        from: addDays(søknadsperiode.from, 4),
        to: addDays(søknadsperiode.from, 5),
    };
    const ferieperiode: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 6),
    };
    await velgPeriode(page, søknadsperiode);
    await leggTilUtenlandsopphold(page, periodeUtenlandsopphold, innlagtPeriode);
    await leggTilFerie(page, ferieperiode);
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
