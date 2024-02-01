import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { test, expect } from '@playwright/test';
import { setupMockRoutes } from '../utils/setup-mock-routes';

const defaultInnsynsdata: Innsynsdata = {
    svarfrist: undefined,
    søker: søkerMockData as any,
    mellomlagring: {},
    søknader: søknaderMockData as any,
};

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

test('Mottar svarfrist fra api', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            svarfrist: ISODateToDate('2021-01-01'),
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen: fredag 1. januar 2021')).toBeVisible();
});

test('Mottar ikke svarfrist men behandlingstid fra api', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            behandlingstid: { uker: 3 },
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er 3 uker fra vi fikk søknaden din.')).toBeVisible();
});

test('Mottar hverken svarfrist eller behandlingstid fra api', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(defaultInnsynsdata) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er 7 uker fra vi fikk søknaden din.')).toBeVisible();
});
