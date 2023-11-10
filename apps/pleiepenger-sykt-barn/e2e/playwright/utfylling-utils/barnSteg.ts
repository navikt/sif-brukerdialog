import { Page } from '@playwright/test';

const fyllUtMedRegistrertBarn = async (page: Page, navnOgFdato: string) => {
    await page.getByLabel(navnOgFdato).check();
};

const fyllUtAnnetBarnMedFnr = async (page: Page, barn: { navn: string; fnr: string; relasjon: string }) => {
    const { navn, fnr, relasjon } = barn;
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill(fnr);
    await page.getByLabel('Barnets navn').fill(navn);
    await page.getByLabel('Annet', { exact: true }).check();
    await page
        .getByLabel('Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for')
        .fill(relasjon);
};

const fyllUtAnnetBarnUtenFnr = async (
    page: Page,
    barn: { navn: string; fødselsdato: string; relasjon: string; fødselsattest: string },
) => {
    const { navn, fødselsattest, fødselsdato, relasjon } = barn;
    await page.getByLabel('Søknaden gjelder et annet barn').check();
    await page.getByLabel('Barnet har ikke fødselsnummer/D-nummer').check();
    await page.getByLabel('Barnet bor i utlandet').check();
    await page.getByLabel('Barnets navn').fill(navn);
    await page.getByLabel('Barnets fødselsdato').fill(fødselsdato);
    await page
        .getByRole('group', { name: 'Hvilken relasjon har du til barnet?' })
        .getByLabel('Annet', { exact: true })
        .check();
    await page
        .getByLabel('Beskriv hvem du er i forhold til barnet, og hvilken tilsynsrolle du har i perioden du søker for')
        .fill(relasjon);
    await page.locator('input[name="fødselsattest"]').setInputFiles(fødselsattest);
};

export const barnSteg = {
    fyllUtMedRegistrertBarn,
    fyllUtAnnetBarnMedFnr,
    fyllUtAnnetBarnUtenFnr,
};
