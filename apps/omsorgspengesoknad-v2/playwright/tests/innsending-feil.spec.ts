import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { bekreftOpplysningerOgSend, gåTilOppsummeringMedRegistrertBarn } from '../utils/soknadFlow';

test('viser spesifikk innsendingsfeil ved ugyldige parametre', async ({ page }) => {
    await gåTilOppsummeringMedRegistrertBarn(page, ScenarioType.innsendingFeilerMedUgyldigeParametre);
    await bekreftOpplysningerOgSend(page);

    await expect(page.getByText('Oops, noe gikk galt.')).toBeVisible();
    await expect(
        page.getByText(
            'Beskrivelsen på hvordan barnets sykdom eller funksjonshemning gir markert høyere risiko for fravær fra jobb inneholder tegn som ikke er tillatt. Gå tilbake til steg én og se over teksten.',
        ),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/\/kvittering$/);
});

test('viser generell innsendingsfeil når innsendingen feiler', async ({ page }) => {
    await gåTilOppsummeringMedRegistrertBarn(page, ScenarioType.innsendingFeiler);
    await bekreftOpplysningerOgSend(page);

    await expect(page.getByText('Kunne ikke sende søknaden.')).toBeVisible();
    await expect(page).not.toHaveURL(/\/kvittering$/);
});
