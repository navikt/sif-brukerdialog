import { Page } from '@playwright/test';

import { ScenarioType } from '../../mock/scenarios/types';

const SCENARIO_KEY = 'OMP_SOKNAD_MOCK_SCENARIO';

export const setScenario = async (page: Page, scenario: ScenarioType) => {
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
