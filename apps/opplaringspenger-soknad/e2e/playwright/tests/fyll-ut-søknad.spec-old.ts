import { test } from '@playwright/test';
import { setNow } from '../utils/setNow';
import { setupMockRoutes } from '../utils/setupMockRoutes';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

test.beforeEach(async ({ page }) => {
    await setNow(page);
    await setupMockRoutes(page);
});

test('Fyll ut komplett søknad', async ({ page }) => {
    await page.goto(startUrl);

    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByText('ALFABETISK FAGGOTT').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Hvor foregår opplæringen?').click();
    await page.getByLabel('Hvor foregår opplæringen?').fill('AHus avdeling 1');
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'søndag 8' }).click();
    await page.getByRole('group', { name: 'Kursperioder' }).getByLabel('Ja').check();
    await page
        .locator('div')
        .filter({ hasText: /^Når reiser du til opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Lukk datovelger' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Når reiser du til opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Når er du hjemme fra opplæringsstedet\?Åpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 9' }).click();
    await page.getByLabel('Årsak for reisetid over en dag').click();
    await page.getByLabel('Årsak for reisetid over en dag').fill('En forklaring');
    await page.getByRole('group', { name: 'Jobber du noe de dagene du er' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Skal du ha ferie i løpet av s' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Ferie i perioden' }).click();
    await page.getByRole('button', { name: 'Legg til ferie' }).click();
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'onsdag 4' }).click();
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click({
            button: 'right',
        });
    await page
        .getByLabel('Legg til ferie')
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'torsdag 5' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('group', { name: 'Stemmer det at du er ansatt' }).getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('20');
    await page.getByRole('group', { name: 'Er du frilanser i perioden du' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Åpne datovelger' }).click();
    await page.getByLabel('År', { exact: true }).selectOption('2021');
    await page.getByLabel('mandag 6').click();
    await page.getByRole('group', { name: 'Jobber du fortsatt som' }).getByLabel('Ja').check();
    await page.getByLabel('Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?').click();
    await page
        .getByLabel('Hvor mange timer jobber du normalt per uke som frilanser når du ikke har fravær?')
        .fill('20');
    await page.getByRole('group', { name: 'Er du selvstendig næ' }).getByLabel('Ja').check();
    await page.getByRole('group', { name: 'Har du flere enn én næ' }).getByLabel('Nei').check();
    await page.getByRole('button', { name: 'Registrer virksomhet' }).click();
    await page.getByLabel('Jordbruker').check();
    await page.getByLabel('Hva heter virksomheten?').click();
    await page.getByLabel('Hva heter virksomheten?').fill('ABC');
    await page.getByLabel('Virksomhet', { exact: true }).getByLabel('Nei').check();
    await page.getByLabel('I hvilket land er ABC').selectOption('ALB');
    await page
        .locator('div')
        .filter({ hasText: /^StartdatoÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('dialog', { name: 'Velg dato' }).getByLabel('År').selectOption('2015');
    await page.getByLabel('tirsdag 1', { exact: true }).click();
    await page.getByText('Er pågående').click();
    await page.getByRole('group', { name: 'Har du hatt en varig endring' }).getByLabel('Ja').check();
    await page
        .locator('div')
        .filter({ hasText: /^Oppgi dato for endringenÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page.getByLabel('Oppgi næringsinntekten din').click();
    await page.getByLabel('Oppgi næringsinntekten din').fill('20000');
    await page.getByLabel('Oppgi næringsinntekten din').press('Tab');
    await page.getByLabel('Her kan du skrive kort hva').fill('ABC og noe mer');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page
        .getByRole('group', { name: 'Har du jobbet som arbeidstaker eller frilanser i et annet EØS-land i løpet av' })
        .getByLabel('Ja')
        .check();
    await page.getByRole('button', { name: 'Legg til jobb i et annet EØS-' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'mandag 9' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'lørdag 14' }).click();
    await page.getByLabel('Velg land').selectOption('BGR');
    await page.getByLabel('Arbeidstaker').check();
    await page.getByLabel('Skriv inn navnet på').click();
    await page.getByLabel('Skriv inn navnet på').fill('ABC 2');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('group', { name: 'Har du jobbet som selvstendig' }).locator('span').nth(1).click();
    await page.getByRole('button', { name: 'Legg til næringsvirksomhet i' }).click();
    await page.getByLabel('Jordbruker').check();
    await page.getByLabel('Jordbruker').press('Shift+A');
    await page.getByLabel('Skriv inn navnet på').click();
    await page.getByLabel('Skriv inn navnet på').fill('BC 3');
    await page.getByLabel('Skriv inn virksomhetens').click();
    await page.getByLabel('Skriv inn virksomhetens').fill('123');
    await page.getByLabel('I hvilket land var BC 3').selectOption('BEL');
    await page
        .locator('div')
        .filter({ hasText: /^StartdatoÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page
        .locator(
            '.navds-date__modal-body > .rdp > .rdp-months > .rdp-month > div > .navds-date__caption > .navds-date__caption__year > .navds-select__container',
        )
        .first()
        .click();
    await page.getByRole('dialog', { name: 'Velg dato' }).getByLabel('År').selectOption('2021');
    await page.getByRole('button', { name: 'mandag 6' }).click();
    await page.getByText('Er pågående', { exact: true }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Hvor mange timer jobber du normalt per uke som selvstendig næringsdrivende når').click();
    await page.getByLabel('Hvor mange timer jobber du normalt per uke som selvstendig næringsdrivende når').fill('5');
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page
        .getByRole('group', { name: 'I dagene du søker for, hvilken situasjon gjelder for deg hos Arbeids- og' })
        .locator('label')
        .first()
        .click();
    await page
        .getByRole('group', { name: 'I dagene du søker for, hvilken situasjon gjelder for deg som frilanser?' })
        .locator('label')
        .nth(1)
        .click();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'mandag 2. desember' }).getByLabel('Timer').fill('2');
    await page.getByRole('group', { name: 'tirsdag 3. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'tirsdag 3. desember' }).getByLabel('Timer').fill('3');
    await page.getByRole('group', { name: 'onsdag 4. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'onsdag 4. desember' }).getByLabel('Timer').fill('4');
    await page.getByRole('group', { name: 'torsdag 5. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'torsdag 5. desember' }).getByLabel('Timer').fill('1');
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'fredag 6. desember' }).getByLabel('Timer').fill('2');
    await page.getByRole('group', { name: 'Uke 50' }).getByLabel('Timer').click();
    await page.getByRole('group', { name: 'Uke 50' }).getByLabel('Timer').fill('2');
    await page.getByLabel('Hovedinnhold').click();
    await page
        .getByRole('group', { name: 'I dagene du søker for, hvilken situasjon gjelder for deg som selvstendig næ' })
        .locator('label')
        .nth(2)
        .click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('group', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Ja').check();
    await page.getByRole('button', { name: 'Legg til utenlandsopphold' }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Fra og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og medÅpne datovelger$/ })
        .getByRole('button')
        .click();
    await page.getByRole('button', { name: 'Gå til forrige måned' }).click();
    await page.getByLabel('fredag 1', { exact: true }).click();
    await page.getByLabel('Utenlandsopphold siste 12 må').locator('form').click();
    await page.getByLabel('Velg land').selectOption('AND');
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.locator('label').nth(3).click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('bekreft-label').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
});
