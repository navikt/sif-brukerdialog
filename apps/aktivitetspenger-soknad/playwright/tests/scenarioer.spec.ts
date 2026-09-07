import { expect, test } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';
import { setScenario } from '../utils/scenario';

const sperredeScenarioer = [
    {
        scenario: ScenarioType.nyPeriodeSøknad,
        tekst: 'Det er ikke åpnet for å søke om nye perioder enda',
    },
    {
        scenario: ScenarioType.ubehandletFørstegangssøknad,
        tekst: 'Vi har mottatt din søknad og den er under behandling. Du trenger ikke sende inn ny søknad.',
    },
    {
        scenario: ScenarioType.kanIkkeSøke,
        tekst: 'Når du har fått innvilget aktivitetspenger trenger du ikke søke på nytt før ...',
    },
];

for (const { scenario, tekst } of sperredeScenarioer) {
    test(`${scenario} viser årsaken til at søknaden er sperret`, async ({ page }) => {
        await setScenario(page, scenario);
        await page.goto('/');

        await expect(
            page.getByRole('heading', { name: 'Søknaden om aktivitetspenger er ikke tilgjengelig for deg nå' }),
        ).toBeVisible();
        await expect(page.getByText(tekst)).toBeVisible();
    });
}
