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

export const søknadStepConfig: StepConfig<Søknadsdata> = {
    [SøknadStepId.PERSONALIA]: {
        id: SøknadStepId.PERSONALIA,
        route: 'om-deg',
        isCompleted: (s) => s.personalia !== undefined,
    },
    [SøknadStepId.HOBBY]: {
        id: SøknadStepId.HOBBY,
        route: 'hobby',
        isIncluded: (s) => s.personalia?.harHobby === 'ja',
        isCompleted: (s) => s.hobby !== undefined,
    },
    [SøknadStepId.KONTAKT]: {
        id: SøknadStepId.KONTAKT,
        route: 'kontaktinfo',
        isCompleted: (s) => s.kontakt !== undefined,
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
