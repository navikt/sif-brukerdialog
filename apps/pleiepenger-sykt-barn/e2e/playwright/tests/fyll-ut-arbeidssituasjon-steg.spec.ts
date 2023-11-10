import { test } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { routeUtils } from '../setup/routeUtils';
import { setNow } from '../setup/setNow';
import { getSøknadsperiode } from '../setup';
import { arbeidssituasjonSteg } from '../utfylling-utils/arbeidssituasjonSteg';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.startOnStep(page, StepID.ARBEIDSSITUASJON, getSøknadsperiode());
});

test('Fyll ut komplett steg', async ({ page }) => {
    const søknadsperiode = getSøknadsperiode();
    await arbeidssituasjonSteg.fyllUtArbeidssituasjonSteg(page, søknadsperiode);
});
