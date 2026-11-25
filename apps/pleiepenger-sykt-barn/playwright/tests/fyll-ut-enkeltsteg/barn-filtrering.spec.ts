import { RegistrertBarn } from '@navikt/sif-common-api';
import { expect, Page, test } from '@playwright/test';

import { mellomlagringMock } from '../../mock-data/mellomlagring';
import { routeUtils } from '../../utils/routeUtils';

const createBarn = (aktørId: string, fornavn: string, fødselsdato = '2026-01-01'): RegistrertBarn => ({
    aktørId,
    fornavn,
    etternavn: 'Nordmann',
    fødselsdato: new Date(fødselsdato),
});

const gåTilBarnSteg = async (page: Page, barn: RegistrertBarn[], mellomlagring?: object) => {
    await routeUtils.setupMockRoutes(page, { barnRespons: { barn }, mellomlagring });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad/velkommen');
    await expect(page.getByRole('heading', { name: 'Hei, Test' })).toBeVisible();
    await page.getByText('Jeg bekrefter at jeg har').click();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page.getByRole('heading', { name: 'Barn', level: 1 })).toBeVisible();
};

test('viser annet barn når begge registrerte barn er tvetydige', async ({ page }) => {
    const slettedeMellomlagringer: string[] = [];
    page.on('request', (request) => {
        if (request.url().includes('/mellomlagring/') && request.method() === 'DELETE') {
            slettedeMellomlagringer.push(request.url());
        }
    });
    await routeUtils.setupMockRoutes(page, {
        barnRespons: {
            barn: [createBarn('1', 'Ukjent navn'), createBarn('2', 'Ukjent navn')],
        },
        mellomlagring: mellomlagringMock,
    });
    await page.goto('http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger/soknad');

    await expect(page.getByRole('heading', { name: 'Hei, Test' })).toBeVisible();
    await expect(page).toHaveURL(/\/velkommen$/);
    expect(slettedeMellomlagringer).toHaveLength(0);

    const samtykke = page.getByLabel('Jeg bekrefter at jeg har');
    await expect(samtykke).not.toBeChecked();
    await samtykke.check();
    await page.getByRole('button', { name: 'Start søknad' }).click();
    await expect(page.getByText('Ukjent navn Nordmann', { exact: true })).toHaveCount(0);
    await expect(page.getByLabel('Barnets fødselsnummer/D-nummer')).toBeVisible();
});

test('beholder et tredje entydig barn og fjerner de tvetydige', async ({ page }) => {
    await gåTilBarnSteg(page, [
        createBarn('1', 'Ukjent navn'),
        createBarn('2', 'Ukjent navn'),
        createBarn('3', 'Kari'),
    ]);

    await expect(page.getByText('Ukjent navn Nordmann', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Kari Nordmann', { exact: true })).toBeVisible();
    await expect(page.getByText('Søknaden gjelder et annet barn', { exact: true })).toBeVisible();
});
