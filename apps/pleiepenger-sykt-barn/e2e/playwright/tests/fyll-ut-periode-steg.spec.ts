import { DateRange } from '@navikt/sif-common-utils/lib';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, test } from '@playwright/test';
import { addDays } from 'date-fns';
import { StepID } from '../../../src/app/types/StepID';
import { periodeUtils } from '../utfylling-utils/tidsromStep';
import { getSøknadsperiode } from '../utils';
import { routeUtils } from '../utils/routeUtils';
import { setNow } from '../utils/setNow';

const søknadsperiode = getSøknadsperiode();

const { leggTilFerie, leggTilUtenlandsopphold, velgPeriode } = periodeUtils;

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnStep(page, StepID.TIDSROM);
    await expect(page.getByRole('heading', { name: 'Perioden med pleiepenger' })).toBeVisible();
});

test('Velg periode', async ({ page }) => {
    await velgPeriode(page, søknadsperiode);
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
});

test('Legg til ferie', async ({ page }) => {
    const ferieperiode: DateRange = {
        from: addDays(søknadsperiode.from, 3),
        to: addDays(søknadsperiode.from, 6),
    };
    await velgPeriode(page, søknadsperiode);
    await leggTilFerie(page, ferieperiode);
});
