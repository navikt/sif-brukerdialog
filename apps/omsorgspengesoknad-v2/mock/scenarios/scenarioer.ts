import { alfaTestesen, betaTestesen, ingenBarnProfil, standardProfil } from '@sif/api/mock-data';

import { ScenarioData, ScenarioType } from './types';

const defaultScenarioData: ScenarioData = {
    ...standardProfil,
    mellomlagring: undefined,
};

const ingenRegistrerteBarnScenarioData: ScenarioData = {
    ...ingenBarnProfil,
    mellomlagring: undefined,
};

const toBarnMedVedtakScenarioData: ScenarioData = {
    ...standardProfil,
    barn: {
        barn: [alfaTestesen, betaTestesen],
    },
    vedtakPerAktørId: {
        [alfaTestesen.aktørId]: { harInnvilgedeBehandlinger: true, saksnummer: 'SAK-001', vedtaksdato: '2024-01-15' },
        [betaTestesen.aktørId]: { harInnvilgedeBehandlinger: false, saksnummer: null, vedtaksdato: null },
    },
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
            invalidParameters: [{ parameterName: 'høyereRisikоForFraværBeskrivelse' }],
        },
    },
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
    [ScenarioType.ingenRegistrerteBarn]: ingenRegistrerteBarnScenarioData,
    [ScenarioType.toBarnMedVedtak]: toBarnMedVedtakScenarioData,
    [ScenarioType.innsendingFeiler]: innsendingFeilerScenarioData,
    [ScenarioType.innsendingFeilerMedUgyldigeParametre]: innsendingFeilerMedUgyldigeParametreScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
