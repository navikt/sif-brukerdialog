import { test, expect } from '@playwright/test';
import { format } from 'date-fns';
import { setupMockApi } from '../utils/setupMockApi';
import { checkA11y, getSøknadsperiode } from '../utils';
import { setNow } from '../utils/setNow';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockApi(page);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    const søknadsperiode = getSøknadsperiode();
    const fraDatoString = format(søknadsperiode.from, 'dd.MM.yyyy');
    const tilDatoString = format(søknadsperiode.to, 'dd.MM.yyyy');

    await page.goto(startUrl);

    /** Velkommen side */
    await expect(page.getByRole('heading', { name: 'Hei Test' })).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').check();
    await checkA11y(page);
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Barn */
    await expect(page.getByRole('heading', { level: 1, name: 'Barn' })).toBeVisible();
    await page.getByLabel('ALFABETISK FAGGOTTFødt 08.12.2019').check();
    await checkA11y(page);
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Perioden med pleiepenger */
    await expect(page.getByRole('heading', { level: 1, name: 'Perioden med pleiepenger' })).toBeVisible();
    await page.getByLabel('Fra og med').fill(fraDatoString);
    await page.getByLabel('Til og med').fill(tilDatoString);
    await page
        .getByRole('group', { name: 'Skal du reise til utlandet i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('group', { name: 'Skal du ha ferie i perioden du søker for?' }).getByLabel('Nei').check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Arbeidssituasjon */
    await expect(page.getByRole('heading', { level: 1, name: 'Arbeidssituasjonen din' })).toBeVisible();
    await page.getByLabel('Arbeidsgivere').getByLabel('Ja').check();
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .click();
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .fill('37,5');
    await page
        .getByLabel('Hvor mange timer jobber du vanligvis hos SJOKKERENDE ELEKTRIKER? Oppgi tiden i et snitt per uke:')
        .press('Tab');
    await page
        .getByRole('group', { name: 'Mottar du fosterhjemsgodtgjørelse eller omsorgsstønad fra kommunen?' })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', { name: 'Jobber du som frilanser eller mottar du honorar?' })
        .getByLabel('Nei')
        .check();
    await page.getByLabel('Selvstendig næringsdrivende').getByLabel('Nei').check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av de 3 siste månedene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Har du jobbet som selvstendig næringsdrivende i et annet EØS-land i løpet av de 3 siste årene før perioden du søker om?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Arbeid i perioden */
    await expect(page.getByRole('heading', { level: 1, name: 'Jobb i søknadsperioden' })).toBeVisible();
    await page.getByLabel('Jeg jobber ikke').check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Omsorgstilbud */
    await expect(page.getByRole('heading', { level: 1, name: 'Omsorgstilbud i søknadsperioden' })).toBeVisible();
    await page
        .getByRole('group', {
            name: 'Har barnet vært fast og regelmessig i skole/barnehage, eller andre omsorgstilbud, fra datoen du søker om og frem til nå?',
        })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', {
            name: 'Skal barnet være fast og regelmessig på skolen, i barnehagen eller i andre omsorgstilbud fremover i tid?',
        })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Medlemsskap */
    await expect(page.getByRole('heading', { level: 1, name: 'Medlemskap' })).toBeVisible();
    await page
        .getByRole('group', { name: 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?' })
        .getByLabel('Nei')
        .check();
    await page
        .getByRole('group', { name: 'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Legeerklæring */
    await expect(page.getByRole('heading', { level: 1, name: 'Legeerklæring' })).toBeVisible();
    await page.locator('input[name="legeerklæring"]').setInputFiles('e2e/playwright/files/navlogopng.png');
    await page.getByRole('button', { name: 'Neste', exact: true }).click();

    /** Oppsummering */
    await expect(page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',
        )
        .check();
    await page.getByRole('button', { name: 'Send inn søknaden', exact: true }).click();

    /** Kvittering */
    await page.waitForURL('**/soknad-sendt');
    const heading = await page.getByRole('heading', {
        level: 2,
        name: 'Vi har mottatt søknaden din om pleiepenger for sykt barn',
    });
    await expect(heading).toBeVisible();
});
