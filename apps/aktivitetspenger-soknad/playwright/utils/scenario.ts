import { Page } from '@playwright/test';
import { MellomlagringBlob } from '@sif/soknad-app';

import { getScenarioMockData } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';

const SCENARIO_KEY = 'AKT_SOKNAD_MOCK_SCENARIO';
const STORAGE_KEY = 'AKT_SOKNAD_MOCK_DATA';

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

export const setScenarioWithMellomlagring = async (
    page: Page,
    scenario: ScenarioType,
    mellomlagring: MellomlagringBlob,
) => {
    await page.addInitScript(
        ({ scenarioKey, storageKey, selectedScenario, scenarioData }) => {
            window.localStorage.setItem(scenarioKey, selectedScenario);
            window.localStorage.setItem(storageKey, JSON.stringify(scenarioData));
        },
        {
            scenarioKey: SCENARIO_KEY,
            storageKey: STORAGE_KEY,
            selectedScenario: scenario,
            scenarioData: {
                ...getScenarioMockData(scenario),
                mellomlagring,
            },
        },
    );
};
