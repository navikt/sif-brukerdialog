import { ScenarioData, ScenarioType } from './types';

const søker = {
    søker: {
        aktørId: '2320509955297',
        fødselsdato: '1985-06-02',
        fødselsnummer: '02068599258',
        fornavn: 'Test',
        mellomnavn: undefined,
        etternavn: 'Testesen',
    },
};

const defaultScenarioData: ScenarioData = {
    ...søker,

    barn: {
        barn: [
            {
                fornavn: 'Alfa',
                etternavn: 'Testesen',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
            },
        ],
    },

    mellomlagring: undefined,
};

const ingenRegistrerteBarnScenarioData: ScenarioData = {
    ...søker,
    barn: {
        barn: [],
    },
    mellomlagring: undefined,
};

const innsendingFeilerScenarioData: ScenarioData = {
    ...defaultScenarioData,
    innsendingResponse: {
        status: 500,
        body: {
            title: 'Noe gikk galt',
            detail: 'Kunne ikke sende søknaden.',
        },
    },
};

const innsendingFeilerMedUgyldigeParametreScenarioData: ScenarioData = {
    ...defaultScenarioData,
    innsendingResponse: {
        status: 400,
        body: {
            title: 'Ugyldig forespørsel',
            invalidParameters: [{ parameterName: 'høyereRisikoForFraværBeskrivelse' }],
        },
    },
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
    [ScenarioType.ingenRegistrerteBarn]: ingenRegistrerteBarnScenarioData,
    [ScenarioType.innsendingFeiler]: innsendingFeilerScenarioData,
    [ScenarioType.innsendingFeilerMedUgyldigeParametre]: innsendingFeilerMedUgyldigeParametreScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
