import type { RegistrertBarn } from '@navikt/sif-common-api';
import { expect, Page, test } from '@playwright/test';

import { StepID } from '../../../src/app/types/StepID';
import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';

const søknadUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad';

const createBarn = (aktørId: string, fornavn: string, fødselsdato = '2026-01-01'): RegistrertBarn => ({
    aktørId,
    fornavn,
    etternavn: 'Nordmann',
    fødselsdato: new Date(fødselsdato),
});

const tvetydigeBarn = [createBarn('1', 'Ukjent navn'), createBarn('2', 'Ukjent navn')];

const gåTilBarnSteg = async (page: Page, barn: RegistrertBarn[]) => {
    await routeUtils.setupMockRoutes(page, { barnRespons: { barn } });
    await page.goto(`${søknadUrl}/velkommen`);
    await page.getByText('Jeg bekrefter at jeg har').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page.getByRole('heading', { name: 'Barn', level: 1 })).toBeVisible();
};

const setupMellomlagring = (page: Page, barnetSøknadenGjelder: string) =>
    routeUtils.setupMockRoutes(page, {
        barnRespons: { barn: [...tvetydigeBarn, createBarn('3', 'Kari')] },
        mellomlagring: {
            ...mellomlagringMock,
            formValues: { ...mellomlagringMock.formValues, barnetSøknadenGjelder },
        },
        lastStep: StepID.OPPLYSNINGER_OM_BARNET,
    });

test('skjuler tvetydige barn og viser entydige', async ({ page }) => {
    await gåTilBarnSteg(page, [...tvetydigeBarn, createBarn('3', 'Kari')]);

    await expect(page.getByText('Ukjent navn Nordmann', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Kari Nordmann', { exact: true })).toBeVisible();
    await expect(page.getByText('Søknaden gjelder et annet barn', { exact: true })).toBeVisible();
});

test('går rett til utfylling av barnet når alle registrerte barn er tvetydige', async ({ page }) => {
    await gåTilBarnSteg(page, tvetydigeBarn);

    await expect(page.getByText('Ukjent navn Nordmann', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Søknaden gjelder et annet barn', { exact: true })).toHaveCount(0);
    await expect(page.getByLabel('Barnets fødselsnummer/D-nummer')).toBeVisible();
});

test('sender inn søknaden med manuelt utfylt barn etter filtrering', async ({ page }) => {
    await gåTilBarnSteg(page, [...tvetydigeBarn, createBarn('3', 'Kari')]);
    await page.getByText('Søknaden gjelder et annet barn', { exact: true }).click();
    await page.getByLabel('Barnets fødselsnummer/D-nummer').fill('08861999573');
    await page.getByLabel('Barnets navn').fill('Tore');
    await page.getByLabel('Mor', { exact: true }).check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await page
        .locator('div')
        .filter({ hasText: /^Fra og med$/ })
        .getByRole('button', { name: 'Åpne datovelger' })
        .click();
    await page.getByRole('button', { name: 'mandag 2', exact: true }).click();
    await page
        .locator('div')
        .filter({ hasText: /^Til og med$/ })
        .getByRole('button', { name: 'Åpne datovelger' })
        .click();
    await page.getByRole('button', { name: 'søndag 15' }).click();
    await page.getByRole('radiogroup', { name: 'Skal du reise til utlandet i' }).getByLabel('Nei').check();
    await page.getByRole('radiogroup', { name: 'Skal du ha ferie i perioden' }).getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await page.getByTestId('er-ansatt').getByText('Ja').click();
    await page.getByLabel('Hvor mange timer jobber du').fill('30');
    await page.getByTestId('arbeidssituasjonFrilanser').getByText('Nei').first().click();
    await page.getByRole('radiogroup', { name: 'Mottar du fosterhjemsgodtgjø' }).getByLabel('Nei').check();
    await page.getByRole('radiogroup', { name: 'Mottar du omsorgs' }).getByLabel('Nei').check();
    await page.getByRole('radiogroup', { name: 'Jobber du som frilanser eller' }).getByLabel('Nei').check();
    const frilansTimerInput = page
        .getByTestId('arbeidssituasjonFrilanser')
        .getByLabel('Hvor mange timer jobbet du');
    if (await frilansTimerInput.isVisible()) {
        await frilansTimerInput.fill('33');
    }
    await page.getByTestId('arbeidssituasjonSelvstendig').getByLabel('Nei').check();
    await page.getByTestId('arbeidssituasjonOpptjeningUtland').getByLabel('Nei').check();
    await page.getByTestId('arbeidssituasjonUtenlandskNæring').getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByLabel('Jeg jobber ikke').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('erIOmsorgstilbud-fremtid_no').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByRole('radiogroup', { name: 'Har du bodd i utlandet i hele' }).getByLabel('Nei').check();
    await page.getByRole('radiogroup', { name: 'Planlegger du å bo i utlandet' }).getByLabel('Nei').check();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await page.getByTestId('typedFormikForm-submitButton').click();

    await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
    await expect(page.getByText('Tore', { exact: true })).toBeVisible();
    await page.getByText('Jeg bekrefter at').click();
    await page.getByTestId('typedFormikForm-submitButton').click();
    await expect(page.getByRole('heading', { name: 'Vi har mottatt søknaden din' })).toBeVisible();
});

test('viser barn med samme navn og ulik fødselsdato', async ({ page }) => {
    await gåTilBarnSteg(page, [
        createBarn('1', 'Kari', '2026-01-01'),
        createBarn('2', 'Kari', '2026-01-02'),
    ]);

    await expect(page.getByText('Kari Nordmann', { exact: true })).toHaveCount(2);
});

test('fortsetter påbegynt søknad når valgt barn er entydig', async ({ page }) => {
    await setupMellomlagring(page, '3');
    await page.goto(søknadUrl);

    await page.waitForURL('**/tidsrom');
    await expect(page.getByRole('textbox', { name: 'Fra og med' })).toHaveValue('03.01.2023');
});

test('sletter påbegynt søknad og starter på nytt når valgt barn er tvetydig', async ({ page }) => {
    const slettMellomlagring = page.waitForRequest(
        (request) => request.url().includes('/mellomlagring/') && request.method() === 'DELETE',
    );
    await setupMellomlagring(page, '1');
    await page.goto(søknadUrl);

    await slettMellomlagring;
    await page.waitForURL('**/velkommen');
    await expect(page.getByLabel('Jeg bekrefter at jeg har')).not.toBeChecked();
});
