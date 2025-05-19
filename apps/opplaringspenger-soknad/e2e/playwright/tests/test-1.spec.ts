import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/opplaringspenger/soknad/arbeidssituasjon');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('button', { name: 'Ja' }).click();
    await page.getByRole('main', { name: 'Hovedinnhold' }).click();
    await page.getByRole('link', { name: 'Forrige steg' }).click();
    await page.getByRole('checkbox', { name: 'Annet opplæringssted' }).check();
    await page.getByRole('textbox', { name: 'Oppgi navn på opplæringsstedet' }).click();
    await page.getByRole('textbox', { name: 'Oppgi navn på opplæringsstedet' }).fill('Annet opplæringssted skrvet ');
    await page.getByTestId('typedFormikForm-submitButton').click();
});
