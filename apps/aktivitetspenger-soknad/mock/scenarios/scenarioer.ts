import { standardProfilMedKontonummer } from '@sif/api/mock-data';

import { ScenarioData, ScenarioType } from './types';

const defaultScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    mellomlagring: undefined,
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
