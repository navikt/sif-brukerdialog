import { expect, test } from '@playwright/test';

import { arbeidsgiverIngenArbeid, arbeidsgiverMedFrilansoppdragMock } from '../../../mock/data/arbeidsgiverMock';
import { SøknadRoutes } from '../../../src/app/types/SøknadRoutes';
import {
    fyllUtArbeidssituasjonStep,
    fyllUtArbeidssituasjonStepIngenArbeid,
} from '../../utfylling-utils/3.arbeidssituasjonStep';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Fyll ut arbeidssituasjon steg - vanlig arbeidsgiver', async ({ page }) => {
    await routeUtils.resumeFromRoute(page, SøknadRoutes.ARBEIDSSITUASJON, { arbeidssituasjon: undefined });
    await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
    await fyllUtArbeidssituasjonStep(page);
});

test('Fyll ut arbeidssituasjon steg - vanlig arbeidsgiver og frilansoppdrag', async ({ page }) => {
    await routeUtils.resumeFromRoute(
        page,
        SøknadRoutes.ARBEIDSSITUASJON,
        { arbeidssituasjon: undefined },
        { arbeidsgiver: arbeidsgiverMedFrilansoppdragMock },
    );
    await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
    await fyllUtArbeidssituasjonStep(page, true);
});

test('Fyll ut arbeidssituasjon steg - ingen arbeidsinfo', async ({ page }) => {
    await routeUtils.resumeFromRoute(
        page,
        SøknadRoutes.ARBEIDSSITUASJON,
        { arbeidssituasjon: undefined },
        { arbeidsgiver: arbeidsgiverIngenArbeid },
    );
    await expect(page.getByRole('heading', { name: 'Din arbeidssituasjon' })).toBeVisible();
    await fyllUtArbeidssituasjonStepIngenArbeid(page);
});
