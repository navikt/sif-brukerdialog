import { expect, test } from '@playwright/test';
import { StepID } from '../../../src/app/types/StepID';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

test.beforeEach(async ({ page }) => {
    await setNow(page);
});

test('Start med mellomlagring', async ({ page }) => {
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: mellomlagringMock,
        lastStep: StepID.OPPLYSNINGER_OM_BARNET,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad');
    await page.waitForURL('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/tidsrom');
    await expect(page.getByRole('heading', { name: 'Perioden med pleiepenger' })).toBeVisible();
});
