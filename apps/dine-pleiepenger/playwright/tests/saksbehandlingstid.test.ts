import { expect, test } from '@playwright/test';
import dayjs from 'dayjs';

import { enSakMockData } from '../mockdata/enSakMockData';
import { setupMockRoutes } from '../utils/setup-mock-routes';

test.beforeEach(async ({ page, context }) => {
    await setupMockRoutes(page);
    await context.addCookies([
        {
            name: 'navno-consent',
            value: '{%22consent%22:{%22analytics%22:true%2C%22surveys%22:true}%2C%22userActionTaken%22:true%2C%22meta%22:{%22createdAt%22:%222026-06-29T13:09:24.316Z%22%2C%22updatedAt%22:%222026-06-29T13:09:24.316Z%22%2C%22version%22:5%2C%22analyticsId%22:%22bf67e4ae-fd22-4f33-9b08-35c83e9e174d%22}}',
            domain: 'localhost', // eller ditt domene
            path: '/',
        },
    ]);
});

const getSakResponseMedUtledetStatus = (status: any) => ({
    sak: {
        ...enSakMockData.saker[0],
        utledetStatus: { ...enSakMockData.saker[0].utledetStatus, ...status },
    },
    inntektsmeldinger: [],
});

test('Saksbehandlingstid er i fremtid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({
            saksbehandlingsFrist: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
});

test('Saksbehandlingstid er i dag', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().format('YYYY-MM-DD') });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Du kan forvente svar innen')).toBeVisible();
});

test('Saksbehandlingstid er i fortid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({
            saksbehandlingsFrist: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        });
        await route.fulfill({ status: 200, body: JSON.stringify(response) });
    });
    await page.goto('http://localhost:8080/innsyn');
    await expect(page.getByRole('heading', { level: 1, name: 'Din pleiepengesak for sykt barn' })).toBeVisible();
    await expect(page.getByText('Vi jobber fremdeles med søknaden din')).toBeVisible();
});

test('Ingen Saksbehandlingstid, men behandlingstid', async ({ page }) => {
    await page.route('**/api/sak/*', async (route) => {
        const response = getSakResponseMedUtledetStatus({ saksbehandlingsFrist: dayjs().format('YYYY-MM-DD') });
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
