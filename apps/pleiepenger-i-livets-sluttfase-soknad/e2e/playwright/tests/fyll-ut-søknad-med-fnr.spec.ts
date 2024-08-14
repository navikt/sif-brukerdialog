import { test, expect } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';
import { fyllUtPleietrengendeMedFnr } from '../utfylling-utils/pleietrengendeUtfyllingUtils';

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test('Fyll ut søknad med fnr', async ({ page }) => {
    await page.goto(startUrl);

    /** Velkommen side */
    await expect(page.getByRole('heading', { level: 2, name: 'Hei, PRESENTABEL' })).toBeVisible();
    await page.getByLabel('Jeg bekrefter at jeg har forstått mitt ansvar som søker').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();

    /** Pleietrengende side */
    await fyllUtPleietrengendeMedFnr(page);
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Tidsrom side */
    await expect(
        page.getByRole('heading', { level: 1, name: 'Dager du må være hjemme fra jobb for å gi pleie' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click({ clickCount: 2 });
    await page
        .getByRole('group', { name: 'Hvilke dager skal du være hjemme fra jobb for å gi pleie?' })
        .getByRole('button', { name: '33' })
        .click();
    await page.getByRole('button', { name: 'Gå til neste måned' }).click();
    await page.getByLabel('Mandag 4').click();
    await page.getByLabel('Mandag 11').click();
    await page.getByLabel('Mandag 18').click();
    await page.getByLabel('Mandag 25').click();
    await page
        .getByRole('group', { name: 'Skal du pleie personen hjemme i de dagene du søker for?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('group', { name: 'Skal du jobbe delvis i noen av dagene du søker for?' })
        .getByLabel('Ja')
        .check();
    await page
        .getByRole('group', { name: 'Oppholder du deg i utlandet i noen av dagene du søker for?' })
        .getByLabel('Nei')
        .check();
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Arbeidssituasjon */
    await expect(page.getByRole('heading', { level: 1, name: 'Arbeidssituasjon' })).toBeVisible();
    await page
        .getByRole('group', {
            name: 'Stemmer det at du er ansatt hos Arbeids- og velferdsetaten i perioden du søker for?',
        })
        .getByLabel('Ja')
        .check();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .click();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke hos Arbeids- og velferdsetaten når du ikke har fravær?')
        .fill('37,5');
    await page.getByRole('group', { name: 'Er du frilanser i perioden du søker for?' }).getByLabel('Nei').check();
    await page
        .getByRole('group', { name: 'Er du selvstendig næringsdrivende i perioden du søker for?' })
        .getByLabel('Nei')
        .check();
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
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Jobb i søknadsperioden */
    await expect(page.getByRole('heading', { level: 1, name: 'Jobb i søknadsperioden' })).toBeVisible();
    await page.getByRole('group', { name: 'mandag 14. august' }).getByLabel('Timer').fill('3');
    await page.getByRole('group', { name: 'mandag 14. august' }).getByLabel('Minutter').fill('30');
    await page.getByRole('group', { name: 'onsdag 16. august' }).getByLabel('Timer').fill('3');
    await page.getByRole('group', { name: 'onsdag 16. august' }).getByLabel('Minutter').fill('30');
    await page.getByRole('group', { name: 'Uke 36' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Uke 36' }).getByLabel('Timer').fill('3');
    await page.getByRole('group', { name: 'Uke 36' }).getByLabel('Minutter').fill('30');
    await page.getByRole('group', { name: 'mandag 18. september' }).click();
    await page.getByRole('group', { name: 'Uke 38' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Uke 38' }).getByLabel('Timer').fill('3');
    await page.getByRole('group', { name: 'Uke 38' }).getByLabel('Minutter').fill('30');
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Medlemsskap */
    await expect(page.getByRole('heading', { level: 1, name: 'Medlemskap i folketrygden' })).toBeVisible();
    await page
        .getByRole('group', { name: 'Har du bodd i utlandet i hele eller deler av de siste 12 månedene?' })
        .getByLabel('Nei')
        .click();
    await page
        .getByRole('group', { name: 'Planlegger du å bo i utlandet i hele eller deler av de neste 12 månedene?' })
        .getByLabel('Nei')
        .click();
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Legeerklæring */
    await expect(page.getByRole('heading', { level: 1, name: 'Legeerklæring' })).toBeVisible();
    await page.locator('input[name="vedlegg"]').setInputFiles('./e2e/playwright/files/navlogopng.png');
    await page.getByRole('button', { name: 'Neste steg', exact: true }).click();

    /** Oppsummering */
    await expect(page.getByRole('heading', { level: 1, name: 'Oppsummering' })).toBeVisible();
    await page
        .getByLabel(
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til pleiepenger.',
        )
        .check();
    await page.getByRole('button', { name: 'Send søknad', exact: true }).click();

    /** Kvittering */
    await expect(
        page.getByRole('heading', { level: 1, name: 'Vi har mottatt søknad om pleiepenger i livets sluttfase' }),
    ).toBeVisible();
});
