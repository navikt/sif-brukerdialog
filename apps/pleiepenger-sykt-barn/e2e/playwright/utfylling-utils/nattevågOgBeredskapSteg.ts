import { Page } from '@playwright/test';

const fyllUtNattevåkOgBeredskapSteg = async (page: Page) => {
    await page.getByLabel('Nattevåk').getByLabel('Ja').check();
    await page
        .getByLabel(
            'Nå trenger vi en beskrivelse av hvordan barnets sykdom gir et pleie- eller tilsynsbehov om nettene.',
        )
        .fill('Nattevåk ekstrainformasjon');
    await page.getByLabel('Beredskap').getByLabel('Ja').check();
    await page
        .getByLabel('Nå trenger vi en beskrivelse av hvordan barnets sykdom gjør at du må være i beredskap.')
        .fill('Ekstrainformasjon om beredskap');
};

export const nattevåkOgBeredskapSteg = {
    fyllUtNattevåkOgBeredskapSteg,
};
