import { expect, Page } from '@playwright/test';

/**
 * Leser ut DeltakelseHandlinger fra DevDeltakelseHandlinger-panelet.
 * Panelet vises kun når SIF_PUBLIC_VIS_DEV_INFO=true.
 */
export const åpneDeltakelseHandlingerPanel = async (page: Page) => {
    const readMore = page.getByRole('button', { name: 'Deltakelse handlinger (kun synlig i Q)' });
    await readMore.click();
};

export const forventHandling = async (page: Page, handling: string, verdi: 'true' | 'false') => {
    await expect(page.locator(`text=${handling}`).locator('..').getByText(verdi)).toBeVisible();
};

/**
 * Navigerer til deltakersiden for et scenario via deltaker-ID.
 */
export const gåTilDeltakerSide = async (page: Page, deltakerId: string, forventetNavn: string) => {
    await page.goto(`./deltaker/${deltakerId}`);
    await expect(page.getByRole('heading', { name: forventetNavn })).toBeVisible();
};
