import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegConfig } from '@rammeverk/types';
import { Søknadsdata } from '../types/Søknadsdata';

export enum StegId {
    PERSONALIA = 'personalia',
    KJÆLEDYR = 'kjæledyr',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}

export const stegConfig: StegConfig = {
    [StegId.PERSONALIA]: {
        id: StegId.PERSONALIA,
        route: 'om-deg',
    },
    [StegId.KJÆLEDYR]: {
        id: StegId.KJÆLEDYR,
        route: 'kjaledyr',
    },
    [StegId.KONTAKT]: {
        id: StegId.KONTAKT,
        route: 'kontaktinfo',
    },
    [StegId.OPPSUMMERING]: {
        id: StegId.OPPSUMMERING,
        route: 'oppsummering',
    },
};

export const stegRekkefølge: StegId[] = [StegId.PERSONALIA, StegId.KJÆLEDYR, StegId.KONTAKT, StegId.OPPSUMMERING];

export const skalStegVises = (stegId: string, søknadsdata: Søknadsdata): boolean => {
    switch (stegId) {
        case StegId.KJÆLEDYR:
            return søknadsdata[StegId.PERSONALIA]?.harKjæledyr === 'ja';
        default:
            return true;
    }
};
