import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { test, expect } from '@playwright/test';
import { setupMockRoutes } from '../utils/setup-mock-routes';
import { Saker } from '../../../src/types/Saker';
import dayjs from 'dayjs';

const sak: Saker = {
    sak: {
        saksbehandlingsFrist: new Date(),
    },
};

const defaultInnsynsdata: Innsynsdata = {
    saker: [],
    harSak: false,
    søker: søkerMockData as any,
    mellomlagring: {},
    søknader: søknaderMockData as any,
};

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

test('Svarfrist er i fremtid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ sak: { saksbehandlingsFrist: dayjs().add(1, 'day').toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen:')).toBeVisible();
});

test('Svarfrist er i dag', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ sak: { saksbehandlingsFrist: dayjs().toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen:')).toBeVisible();
});

test('Svarfrist er i fortid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ sak: { saksbehandlingsFrist: dayjs().subtract(1, 'day').toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er')).toBeVisible();
});

test('Ingen svarfrist, men behandlingstid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saksbehandlingstidUker: 3,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er 3 uker fra vi fikk søknaden din.')).toBeVisible();
});

test('Hverken svarfrist eller behandlingstid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        await route.fulfill({ status: 200, body: JSON.stringify(defaultInnsynsdata) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er 7 uker fra vi fikk søknaden din.')).toBeVisible();
});
