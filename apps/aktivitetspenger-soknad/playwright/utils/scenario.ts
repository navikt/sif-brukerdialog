import { Page } from '@playwright/test';

const SCENARIO_KEY = 'AKT_SOKNAD_MOCK_SCENARIO';

export const setScenario = async (page: Page, scenario: string) => {
    await page.addInitScript(
        ({ scenarioKey, selectedScenario }) => {
            window.localStorage.setItem(scenarioKey, selectedScenario);
        },
        {
            scenarioKey: SCENARIO_KEY,
            selectedScenario: scenario,
        },
    );
};
