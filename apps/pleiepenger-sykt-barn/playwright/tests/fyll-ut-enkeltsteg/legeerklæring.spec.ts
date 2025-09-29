import { expect, test } from '@playwright/test';

import { SøknadFormValues } from '../../../src/app/types/søknad-form-values/SøknadFormValues';
import { StepID } from '../../../src/app/types/StepID';
import { YesOrNoOrDoNotKnow } from '../../../src/app/types/YesOrNoOrDoNotKnow';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { setNow } from '../../utils/setNow';

const formValues: SøknadFormValues = {
    ...mellomlagringMock.formValues,
    omsorgstilbud: {
        ...mellomlagringMock.formValues.omsorgstilbud,
        erIOmsorgstilbudFremtid: YesOrNoOrDoNotKnow.YES,
    },
} as any;

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: { ...mellomlagringMock, formValues },
        lastStep: StepID.MEDLEMSKAP,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/legeerklaering');
    await expect(page.getByRole('heading', { name: 'Last opp legeerklæring' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
});

test.describe('Fyll ut legeerklæring', () => {
    test('Ett vedlegg', async ({ page }) => {
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            await page.locator('input[type="file"]').dispatchEvent('click'),
        ]);
        await fileChooser.setFiles('./playwright/files/navlogopng.png');
        const listItems = await page.getByText('navlogopng.png');
        await expect(listItems).toHaveCount(1);

        await page.getByTestId('typedFormikForm-submitButton').click();
    });
    test('Flere vedlegg', async ({ page }) => {
        const fileChooserPromise = page.waitForEvent('filechooser');

        await page.locator('input[type="file"]').dispatchEvent('click');
        const fileChooser1 = await fileChooserPromise;
        await fileChooser1.setFiles('./playwright/files/navlogopng.png');

        await page.locator('input[type="file"]').dispatchEvent('click');
        const fileChooser2 = await fileChooserPromise;
        await fileChooser2.setFiles('./playwright/files/navlogopng.png');

        const listItems = await page.getByText('navlogopng.png');
        await expect(listItems).toHaveCount(2);

        await page.getByTestId('typedFormikForm-submitButton').click();
    });
});
