import { test, expect } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../utils/routeUtils';
import { StepID } from '../../../src/app/types/StepID';
import { SøknadFormValues } from '../../../src/app/types/søknad-form-values/SøknadFormValues';

const formValues: SøknadFormValues = {
    ...(mellomlagringMock.formValues as any),
    periodeFra: '2022-12-05',
    periodeTil: '2023-02-12',
};

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await routeUtils.setupMockRoutes(page, {
        mellomlagring: { ...mellomlagringMock, formValues },
        lastStep: StepID.ARBEIDSSITUASJON,
    });
    await page.goto('http://localhost:8080/');
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/omsorgstilbud');
    await page.getByRole('heading', { name: 'Omsorgstilbud i søknadsperioden' }).click();
});

test.afterEach(async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Nattevåk og beredskap' })).toBeVisible();
});

test('Fyll ut omsorgstilbud', async ({ page }) => {
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/omsorgstilbud');
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/omsorgstilbud');
    await page.getByText('Ja, i hele eller deler av').first().click();
    await page.getByText('Nei').nth(2).click();
    await page.getByText('Ja, i hele eller deler av').first().click();
    await page.getByText('Nei').nth(3).click();
    await page.getByText('Usikker').click();
    await page.getByText('Ja, i hele eller deler av').nth(1).click();
    await page.getByText('Hver uke er lik').click();
    await page.getByTestId('fasteDager__monday_hours').click();
    await page.getByTestId('fasteDager__monday_hours').fill('1');
    await page.getByTestId('fasteDager__monday_minutes').click();
    await page.getByTestId('fasteDager__monday_minutes').fill('2');
    await page.getByTestId('fasteDager__tuesday_hours').click();
    await page.getByTestId('fasteDager__tuesday_hours').fill('3');
    await page.getByTestId('fasteDager__tuesday_minutes').click();
    await page.getByTestId('fasteDager__tuesday_minutes').fill('4');
    await page.getByTestId('fasteDager__wednesday_hours').click();
    await page.getByTestId('fasteDager__wednesday_hours').fill('5');
    await page.getByTestId('fasteDager__wednesday_minutes').click();
    await page.getByTestId('fasteDager__wednesday_minutes').fill('0');
    await page.getByTestId('fasteDager__thursday_hours').click();
    await page.getByTestId('fasteDager__thursday_hours').fill('1');
    await page.getByTestId('fasteDager__friday_hours').click();
    await page.getByTestId('fasteDager__friday_hours').fill('1');
    await page.getByText('Det varierer fra uke til uke').click();
    await page.getByLabel('Omsorgstilbud desember').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('calendar-grid-date-2022-12-05').click();
    await page.getByLabel('Timer').click();
    await page.getByLabel('Timer').press('Shift+ArrowRight');
    await page.getByLabel('Timer').fill('2');
    await page.getByText('Gjenta disse timene for flere').click();
    await page.getByText('Alle dager i uke').click();
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByTestId('calendar-grid-date-2022-12-19').click();
    await page.getByLabel('Timer').fill('5');
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByLabel('Omsorgstilbud januar').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByLabel('Omsorgstilbud februar').getByRole('button', { name: 'Vis mer' }).click();
    await page.getByTestId('calendar-grid-date-2023-01-16').click();
    await page.getByLabel('Gjenta disse timene for flere').check();
    await page.getByLabel('Timer').fill('3');
    await page.getByText('Alle dager i januar').click();
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByTestId('calendar-grid-date-2023-02-10').click();
    await page.getByLabel('Timer').fill('5');
    await page.getByRole('button', { name: 'Lagre' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
});
