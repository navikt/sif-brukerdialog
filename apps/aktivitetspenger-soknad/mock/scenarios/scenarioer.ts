import { TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';
import {
    ingenBarnProfil,
    kontonummerApiResponse,
    standardProfil,
    standardProfilMedKontonummer,
} from '@sif/api/mock-data';

import { ScenarioData, ScenarioType } from './types';

const tilgjengeligSøknad = {
    harInnsyn: true,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.FØRSTEGANGSSØKNAD,
} satisfies ScenarioData['tilgjengeligSøknad'];

const kanSøkeFørstegang = {
    harInnsyn: false,
    harUbehandletSøknad: false,
    type: TilgjengeligSøknadType.FØRSTEGANGSSØKNAD,
} satisfies ScenarioData['tilgjengeligSøknad'];

const ubehandletFørstegangssøknad = {
    harInnsyn: false,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgjengeligSøknad'];

const ubehandletAndregangssøknad = {
    harInnsyn: true,
    harUbehandletSøknad: true,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgjengeligSøknad'];

const harAktivitetspengerMenUtenforSøknadsvindu = {
    harInnsyn: true,
    harUbehandletSøknad: false,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgjengeligSøknad'];

const ikkeInnsynIngenSøknad = {
    harInnsyn: false,
    harUbehandletSøknad: false,
    type: TilgjengeligSøknadType.INGEN,
} satisfies ScenarioData['tilgjengeligSøknad'];

const defaultScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: kanSøkeFørstegang,
    mellomlagring: undefined,
};

const kanSøkeFørstegangScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: kanSøkeFørstegang,
    mellomlagring: undefined,
};

const ubehandletFørstegangssøknadScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: ubehandletFørstegangssøknad,
    mellomlagring: undefined,
};

const ubehandletAndregangssøknadScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: ubehandletAndregangssøknad,
    mellomlagring: undefined,
};

const sperretAnnetScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: ikkeInnsynIngenSøknad,
    mellomlagring: undefined,
};

const harAktivitetspengerMenUtenforSøknadsvinduScenarioData: ScenarioData = {
    ...standardProfilMedKontonummer,
    tilgjengeligSøknad: harAktivitetspengerMenUtenforSøknadsvindu,
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
    [ScenarioType.kanSøkeFørstegang]: kanSøkeFørstegangScenarioData,
    [ScenarioType.ubehandletFørstegangssøknad]: ubehandletFørstegangssøknadScenarioData,
    [ScenarioType.ubehandletAndregangssøknad]: ubehandletAndregangssøknadScenarioData,
    [ScenarioType.harAktivitetspengerMenUtenforSøknadsvindu]: harAktivitetspengerMenUtenforSøknadsvinduScenarioData,
    [ScenarioType.sperretAnnet]: sperretAnnetScenarioData,
    [ScenarioType.medKontonummer]: medKontonummerScenarioData,
    [ScenarioType.ingenRegistrerteBarn]: ingenRegistrerteBarnScenarioData,
    [ScenarioType.utenKontonummer]: utenKontonummerScenarioData,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return structuredClone(scenarioData[scenario]);
};
