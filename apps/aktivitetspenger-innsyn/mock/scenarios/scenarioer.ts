import { ScenarioData, ScenarioType } from './types';

const defaultScenarioData: ScenarioData = {
    søker: {
        aktørId: '2320509955297',
        fødselsdato: '1985-06-02',
        fødselsnummer: '02068599258',
        fornavn: 'Test',
        mellomnavn: undefined,
        etternavn: 'Testesen',
    },
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
