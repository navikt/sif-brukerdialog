import { Page } from '@playwright/test';

export async function navigerTilMåned(page: Page, måned: string) {
    const month = page.getByLabel('Måned', { exact: true });

    for (let i = 0; i < 5; i++) {
        if ((await month.inputValue()) === måned) {
            return;
        }

        await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    }

    throw new Error(`Fant ikke måned ${måned}`);
}
