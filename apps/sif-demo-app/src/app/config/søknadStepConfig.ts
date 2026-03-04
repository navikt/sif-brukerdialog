import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StepConfig } from '@rammeverk/types';
import { Søknadsdata } from '../types/Søknadsdata';

export enum SøknadStepId {
    PERSONALIA = 'personalia',
    HOBBY = 'hobby',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}

export const søknadStepConfig: StepConfig = {
    [SøknadStepId.PERSONALIA]: {
        id: SøknadStepId.PERSONALIA,
        route: 'om-deg',
    },
    [SøknadStepId.HOBBY]: {
        id: SøknadStepId.HOBBY,
        route: 'kjaledyr',
    },
    [SøknadStepId.KONTAKT]: {
        id: SøknadStepId.KONTAKT,
        route: 'kontaktinfo',
    },
    [SøknadStepId.OPPSUMMERING]: {
        id: SøknadStepId.OPPSUMMERING,
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.PERSONALIA,
    SøknadStepId.HOBBY,
    SøknadStepId.KONTAKT,
    SøknadStepId.OPPSUMMERING,
];

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.PERSONALIA]: 'Personalia',
    [SøknadStepId.HOBBY]: 'Hobby',
    [SøknadStepId.KONTAKT]: 'Kontaktinfo',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};

export const isSøknadStepIncluded = (stepId: string, søknadsdata: Søknadsdata): boolean => {
    switch (stepId) {
        case SøknadStepId.HOBBY:
            return søknadsdata[SøknadStepId.PERSONALIA]?.harHobby === 'ja';
        default:
            return true;
    }
};
