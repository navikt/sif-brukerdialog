import {
    ingenBarnProfil,
    kontonummerApiResponse,
    standardProfil,
    standardProfilMedKontonummer,
} from '@sif/api/mock-data';
import { TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';

import { ScenarioData, ScenarioType } from './types';

const tilgjengeligSøknad = {
    harInnsyn: true,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgjengeligSøknad'];

const defaultScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad,
    mellomlagring: undefined,
};

const medKontonummerScenarioData: ScenarioData = {
    ...standardProfil,
    kontonummer: kontonummerApiResponse,
    tilgjengeligSøknad,
    mellomlagring: undefined,
};

const ingenRegistrerteBarnScenarioData: ScenarioData = {
    ...ingenBarnProfil,
    tilgjengeligSøknad,
    mellomlagring: undefined,
};

const utenKontonummerScenarioData: ScenarioData = {
    ...standardProfil,

    kontonummer: { harKontonummer: false, kontonummer: null } as any,
    tilgjengeligSøknad,
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
