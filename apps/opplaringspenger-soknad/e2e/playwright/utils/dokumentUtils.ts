import { Locator, Page, expect } from '@playwright/test';

export const lastOppDokument = async (
    page: Page,
    inputLocator?: Locator | undefined,
    filePath: string = './e2e/playwright/files/navlogopng.png',
    kontrollerListe: boolean = true,
) => {
    const input = inputLocator || page.locator('input[type="file"]');
    const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), await input.dispatchEvent('click')]);
    await fileChooser.setFiles(filePath);
    if (kontrollerListe) {
        const listItems = await page.getByText('navlogopng.png');
        await expect(listItems).toHaveCount(1);
    }
};
