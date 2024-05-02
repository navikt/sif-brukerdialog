import { expect, test } from '@playwright/test';
import dayjs from 'dayjs';
import { Innsynsdata } from '../../../src/types/InnsynData';
import { sakerAvsluttetMock } from '../mockdata/saker-avsluttet.mock';
import { sakerMock } from '../mockdata/saker.mock';
import { søkerMockData } from '../mockdata/søker.mock';
import { søknaderMockData } from '../mockdata/søknader.mock';
import { setupMockRoutes } from '../utils/setup-mock-routes';

const defaultInnsynsdata: Innsynsdata = {
    saker: sakerMock,
    harSak: true,
    søker: søkerMockData,
    mellomlagring: {},
    brukerprofil: {} as any,
    innsendteSøknader: søknaderMockData as any,
};

const pleietrengende = sakerMock[0].pleietrengende;
const sak = sakerMock[0].sak;
const avsluttetSak = sakerAvsluttetMock[0].sak;

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
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
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
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
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
    await expect(page.getByText('Vi jobber fremdeles med søknaden din')).toBeVisible();
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
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
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

test('Sak er ikke under behandling - ikke vis saksbehandlingstid', async ({ page }) => {
    await page.route('**/innsynsdata', async (route) => {
        const response: Innsynsdata = {
            ...defaultInnsynsdata,
            saker: [{ pleietrengende, sak: { ...avsluttetSak } }],
            saksbehandlingstidUker: undefined,
            harSak: true,
        };
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { name: 'Saksbehandlingstid' })).toBeHidden();
});
