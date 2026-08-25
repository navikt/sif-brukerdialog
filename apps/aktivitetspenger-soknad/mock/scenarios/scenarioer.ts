import {
    ingenBarnProfil,
    kontonummerApiResponse,
    standardProfil,
    standardProfilMedKontonummer,
} from '@sif/api/mock-data';

import { ScenarioData, ScenarioType } from './types';

const defaultScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    mellomlagring: undefined,
};

const medKontonummerScenarioData: ScenarioData = {
    ...standardProfil,
    kontonummer: kontonummerApiResponse,
    mellomlagring: undefined,
};

const ingenRegistrerteBarnScenarioData: ScenarioData = {
    ...ingenBarnProfil,
    mellomlagring: undefined,
};

const utenKontonummerScenarioData: ScenarioData = {
    ...standardProfil,

    kontonummer: { harKontonummer: false, kontonummer: null } as any,
    mellomlagring: undefined,
};

const scenarioData: Record<ScenarioType, ScenarioData> = {
    [ScenarioType.default]: defaultScenarioData,
    [ScenarioType.medKontonummer]: medKontonummerScenarioData,
    [ScenarioType.ingenRegistrerteBarn]: ingenRegistrerteBarnScenarioData,
    [ScenarioType.utenKontonummer]: utenKontonummerScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
