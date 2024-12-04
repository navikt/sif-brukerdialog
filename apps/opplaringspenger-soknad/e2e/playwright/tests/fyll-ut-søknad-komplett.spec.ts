import { Page, test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { fyllUtBarnStep } from '../utfylling-utils/barnStep';
import { fyllUtOpplæringStep } from '../utfylling-utils/opplæringStep';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    await page.goto(startUrl);

    await fyllUtVelkommenPage(page);
    await fyllUtBarnStep(page);
    await fyllUtOpplæringStep(page);
});

const fyllUtVelkommenPage = async (page: Page) => {
    await page.getByText('Hei, PRESENTABEL').isVisible();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
};
