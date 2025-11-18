import { expect, test } from '@playwright/test';
import dayjs from 'dayjs';

import { sakerMock } from '../mockdata/saker.mock';
import { setupMockRoutes } from '../utils/setup-mock-routes';

const sak = sakerMock[0].sak;

test.beforeEach(async ({ page }) => {
    await setupMockRoutes(page);
});

const getSakResponseMedUtledetStatus = (status: any) => ({
    sak: {
        ...sak,
        utledetStatus: { ...sak.utledetStatus, ...status },
    },
    inntektsmeldinger: [],
});

test('Saksbehandlingstid er i fremtid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().add(1, 'day').toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
});

test('Saksbehandlingstid er i dag', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
});

test('Saksbehandlingstid er i fortid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().subtract(1, 'day').toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Vi jobber fremdeles med søknaden din')).toBeVisible();
});

test('Ingen Saksbehandlingstid, men behandlingstid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().toDate() });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
});

test('Hverken Saksbehandlingstid eller behandlingstid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: undefined });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });

    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Forventet behandlingstid er 7 uker fra vi mottar søknad.')).toBeVisible();
});

test('Sak er ikke under behandling - ikke vis saksbehandlingstid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: undefined, status: 'AVSLUTTET' });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Saksbehandlingstid' })).toBeHidden();
});
