import { expect, Page, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';
import { testAccessibility } from '../utils/testAccessibility';

const svarJa = async (page: Page, spørsmål: string | RegExp) => {
    const gruppe = page.getByRole('radiogroup', { name: spørsmål });
    await gruppe.getByLabel('Ja', { exact: true }).check();
};

const svarNei = async (page: Page, spørsmål: string | RegExp) => {
    const gruppe = page.getByRole('radiogroup', { name: spørsmål });
    await gruppe.getByLabel('Nei', { exact: true }).check();
};

const gåTilNesteSteg = async (page: Page, steg: string) => {
    await page.getByRole('button', { name: 'Neste steg' }).click();
    await expect(page).toHaveURL(new RegExp(`/soknad/${steg}`));
};

const setAppVersion = async (page: Page, appVersion: 'dev' | 'prod') => {
    await page.addInitScript((version) => {
        const oppdaterAppSettings = () => {
            const appSettingsElement = document.getElementById('nav:appSettings');
            if (!appSettingsElement) {
                return false;
            }
            const appSettings = JSON.parse(appSettingsElement.textContent || '{}');
            appSettingsElement.textContent = JSON.stringify({ ...appSettings, APP_VERSION: version });
            return true;
        };
        if (oppdaterAppSettings()) {
            return;
        }
        const observer = new MutationObserver(() => {
            if (oppdaterAppSettings()) {
                observer.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    }, appVersion);
};

const miljøer = [
    { miljø: 'prod', appVersion: 'prod' as const, startdatoErSynlig: false },
    { miljø: 'dev/test', appVersion: 'dev' as const, startdatoErSynlig: true },
] as const;

miljøer.forEach(({ miljø, appVersion, startdatoErSynlig }) => {
    test(`fyller ut og sender inn søknaden i ${miljø}`, async ({ page }) => {
        await setAppVersion(page, appVersion);
        await setScenario(page, ScenarioType.kanSøkeFørstegang);
        await page.goto('/');

        await expect(page.getByRole('heading', { name: 'Søknad om aktivitetspenger' })).toBeVisible();
        await testAccessibility(page);

        await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();
        await page.getByRole('button', { name: 'Start søknad' }).click();

        const kontonummerSpørsmål = /Stemmer det at ditt kontonummer er/;
        await expect(page.getByRole('radiogroup', { name: kontonummerSpørsmål })).toBeVisible();
        await testAccessibility(page);
        await svarJa(page, kontonummerSpørsmål);
        await gåTilNesteSteg(page, 'bosted');

        const bostedSpørsmål = 'Bor du i Trondheim kommune?';
        await expect(page.getByRole('radiogroup', { name: bostedSpørsmål })).toBeVisible();
        await svarJa(page, bostedSpørsmål);
        await testAccessibility(page);
        await gåTilNesteSteg(page, 'medlemskap');

        const boddINorgeSpørsmål = 'Har du bodd sammenhengende i Norge de 5 siste årene?';
        await expect(page.getByRole('radiogroup', { name: boddINorgeSpørsmål })).toBeVisible();
        await testAccessibility(page);
        await svarJa(page, boddINorgeSpørsmål);

        const jobbetUtenforNorgeSpørsmål = 'Har du jobbet utenfor Norge de 5 siste årene?';
        await expect(page.getByRole('radiogroup', { name: jobbetUtenforNorgeSpørsmål })).toBeVisible();
        await svarNei(page, jobbetUtenforNorgeSpørsmål);
        await gåTilNesteSteg(page, 'barn');

        const barnSpørsmål = /Stemmer opplysningen om barna?/;
        await expect(page.getByRole('radiogroup', { name: barnSpørsmål })).toBeVisible();
        await testAccessibility(page);
        await svarJa(page, barnSpørsmål);
        await gåTilNesteSteg(page, 'oppsummering');

        await expect(page.getByRole('heading', { name: 'Oppsummering' })).toBeVisible();
        await testAccessibility(page);

        const startdato = page.getByRole('textbox', { name: 'Startdato' });
        if (startdatoErSynlig) {
            await expect(startdato).toBeVisible();
        } else {
            await expect(startdato).toHaveCount(0);
        }

        await page.getByLabel('Jeg bekrefter at opplysningene jeg har gitt er riktige').check();
        const innsending = page.waitForRequest('**/aktivitetspenger/soknad/innsending');
        await page.getByRole('button', { name: 'Send inn' }).click();

        const requestBody = (await innsending).postDataJSON();
        expect(requestBody).not.toHaveProperty('startdato');
        await expect(page.getByRole('heading', { name: 'Søknaden er sendt' })).toBeVisible();
        await testAccessibility(page);
    });
});
