import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { StegConfig } from '@rammeverk/types';
import { Søknadsdata } from '../types/Søknadsdata';

export enum StegId {
    PERSONALIA = 'personalia',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}

export interface AppState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}

export const stegConfig: StegConfig = {
    [StegId.PERSONALIA]: {
        id: StegId.PERSONALIA,
        route: 'om-deg',
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

export const stegRekkefølge: StegId[] = [StegId.PERSONALIA, StegId.KONTAKT, StegId.OPPSUMMERING];
