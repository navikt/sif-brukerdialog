import { ingenBarnProfil, standardProfil } from '@sif/api/mock-data';

import { ScenarioData, ScenarioType } from './types';

const defaultScenarioData: ScenarioData = {
    ...standardProfil,
    mellomlagring: undefined,
};

const ingenRegistrerteBarnScenarioData: ScenarioData = {
    ...ingenBarnProfil,
    mellomlagring: undefined,
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
    [ScenarioType.ingenRegistrerteBarn]: ingenRegistrerteBarnScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
