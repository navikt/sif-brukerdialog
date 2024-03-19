import { Innsynsdata } from '../../../src/types/InnsynData';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { test, expect } from '@playwright/test';
import { setupMockRoutes } from '../utils/setup-mock-routes';
import { sakerMock } from '../mockdata/saker.mock';
import dayjs from 'dayjs';

const defaultInnsynsdata: Innsynsdata = {
    saker: sakerMock,
    harSak: true,
    søker: søkerMockData,
    mellomlagring: {},
    innsendteSøknader: søknaderMockData as any,
};

const pleietrengende = sakerMock[0].pleietrengende;
const sak = sakerMock[0].sak;

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

test('Saksbehandlingstid er i fremtid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...sak, saksbehandlingsFrist: dayjs().add(1, 'day').toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen:')).toBeVisible();
});

test('Saksbehandlingstid er i dag', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...sak, saksbehandlingsFrist: dayjs().toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen:')).toBeVisible();
});

test('Saksbehandlingstid er i fortid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...sak, saksbehandlingsFrist: dayjs().subtract(1, 'day').toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er')).toBeVisible();
});

test('Ingen Saksbehandlingstid, men behandlingstid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...sak, saksbehandlingsFrist: dayjs().toDate() } }],
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Du kan forvente svar innen:')).toBeVisible();
});

test('Hverken Saksbehandlingstid eller behandlingstid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...sak, saksbehandlingsFrist: undefined } }],
            saksbehandlingstidUker: undefined,
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByText('Forventet behandlingstid er 7 uker fra vi fikk søknaden din.')).toBeVisible();
});
