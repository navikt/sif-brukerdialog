import { expect, Page } from '@playwright/test';

import { testAccessibility } from '../utils/testAccessibility';

export const fyllUtDokumentasjon = async (page: Page) => {
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        await page.locator('input[type="file"]').dispatchEvent('click'),
    ]);
    await fileChooser.setFiles('./playwright/files/navlogopng.png');
    const listItems = page.getByText('navlogopng.png');
    await expect(listItems).toHaveCount(1);
    await page.getByRole('group', { name: 'Skal du ettersende vedlegg' }).getByLabel('Nei').check();
    await testAccessibility(page);
    await page.getByTestId('typedFormikForm-submitButton').click();
};
