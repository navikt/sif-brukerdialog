import { afterEach, describe, expect, it, vi } from 'vitest';

const hentEnvUtils = async () => import('./envUtils');

afterEach(() => {
    document.body.replaceChildren();
    delete window.appSettings;
    vi.resetModules();
});

describe('miljøvariabler fra appSettings', () => {
    it('lar direkte tom verdi ha prioritet over prefikset verdi', async () => {
        document.body.innerHTML =
            '<script id="nav:appSettings" type="application/json">{"API_URL":"","SIF_PUBLIC_API_URL":"https://fallback","APP_VERSION":"prod"}</script>';
        const { getMaybeEnv } = await hentEnvUtils();

        expect(getMaybeEnv('API_URL')).toBe('');
    });

    it('bruker prefikset verdi når direkte verdi mangler', async () => {
        document.body.innerHTML =
            '<script id="nav:appSettings" type="application/json">{"SIF_PUBLIC_API_URL":"https://fallback"}</script>';
        const { getMaybeEnv } = await hentEnvUtils();

        expect(getMaybeEnv('API_URL')).toBe('https://fallback');
    });

    it('avviser tom og manglende påkrevd verdi', async () => {
        document.body.innerHTML = '<script id="nav:appSettings" type="application/json">{"TOM":""}</script>';
        const { getRequiredEnv } = await hentEnvUtils();

        expect(() => getRequiredEnv('TOM')).toThrow('Mangler miljøvariabel TOM');
        expect(() => getRequiredEnv('MANGLER')).toThrow('Mangler miljøvariabel MANGLER');
    });

    it('tolker både strengverdien og den boolske verdien true som sann', async () => {
        document.body.innerHTML =
            '<script id="nav:appSettings" type="application/json">{"SANN":"true","OGSAA_SANN":true,"USANN":"false"}</script>';
        const { getMaybeBoolEnv } = await hentEnvUtils();

        expect(getMaybeBoolEnv('SANN')).toBe(true);
        expect(getMaybeBoolEnv('OGSAA_SANN')).toBe(true);
        expect(getMaybeBoolEnv('USANN')).toBe(false);
    });

    it('gir kontrollert feil ved ugyldig JSON', async () => {
        document.body.innerHTML = '<script id="nav:appSettings" type="application/json">{</script>';
        const { getMaybeEnv } = await hentEnvUtils();

        expect(() => getMaybeEnv('API_URL')).toThrow('Kunne ikke lese appSettings: innholdet er ikke gyldig JSON');
    });

    it('avviser verdier som ikke er strenger eller boolske verdier', async () => {
        document.body.innerHTML = '<script id="nav:appSettings" type="application/json">{"API_URL":123}</script>';
        const { getMaybeEnv } = await hentEnvUtils();

        expect(() => getMaybeEnv('API_URL')).toThrow(
            'Kunne ikke lese appSettings: alle verdier må være strenger eller boolske verdier',
        );
    });

    it('bruker window.appSettings når scriptet mangler', async () => {
        window.appSettings = { API_URL: 'https://fra-window' };
        const { getMaybeEnv } = await hentEnvUtils();

        expect(getMaybeEnv('API_URL')).toBe('https://fra-window');
    });
});
