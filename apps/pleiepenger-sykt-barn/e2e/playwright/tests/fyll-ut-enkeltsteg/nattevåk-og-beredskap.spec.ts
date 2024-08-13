import { test, expect } from '@playwright/test';
import { setNow } from '../../utils/setNow';
import { mellomlagringMock } from '../../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';
import { StepID } from '../../../../src/app/types/StepID';
import { SøknadFormValues } from '../../../../src/app/types/søknad-form-values/SøknadFormValues';
import { YesOrNoOrDoNotKnow } from '../../../../src/app/types/YesOrNoOrDoNotKnow';

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
        lastStep: StepID.OMSORGSTILBUD,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/nattevåkOgBeredskap');
    await expect(page.getByRole('heading', { name: 'Nattevåk og beredskap' })).toBeVisible();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Medlemskap' })).toBeVisible();
});

test('Fyll ut arbeidssituasjon', async ({ page }) => {
    await page.getByTestId('nattevåk').getByText('Nei').click();
    await page.getByTestId('beredskap').getByText('Nei').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('typedFormikForm-goBackButton').click();
    await page.getByTestId('nattevåk').getByText('Ja').click();
    await page.getByTestId('nattevåk-tilleggsinfo').fill('Dette er en tekst');
    await page.getByTestId('beredskap').getByText('Ja').click();
    await page.getByTestId('beredskap-tilleggsinfo').fill('Dette er en annen tekst');
    await page.getByTestId('typedFormikForm-submitButton').click();
});
