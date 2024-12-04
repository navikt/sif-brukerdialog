import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

export const fyllUtDokumentasjon = async (page: Page) => {
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('input[type="file"]').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./e2e/playwright/files/navlogopng.png');
    const listItems = page.getByText('navlogopng.png');
    await expect(listItems).toHaveCount(1);

    await page.getByTestId('typedFormikForm-submitButton').click();
};
