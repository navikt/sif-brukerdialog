import { StegConfig } from '@rammeverk/types';

export enum StegId {
    PERSONALIA = 'personalia',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}

export interface DemoSøknadsdata {
    [StegId.PERSONALIA]?: {
        navn: string;
    };
    [StegId.KONTAKT]?: {
        epost: string;
    };
}

export const stegConfig: StegConfig<DemoSøknadsdata> = {
    [StegId.PERSONALIA]: {
        id: StegId.PERSONALIA,
        route: 'om-deg',
        tittel: 'Personalia',
    },
    [StegId.KONTAKT]: {
        id: StegId.KONTAKT,
        route: 'kontaktinfo',
        tittel: 'Kontaktinfo',
    },
    [StegId.OPPSUMMERING]: {
        id: StegId.OPPSUMMERING,
        tittel: 'Oppsummering',
    },
};

export const stegRekkefølge: StegId[] = [StegId.PERSONALIA, StegId.KONTAKT, StegId.OPPSUMMERING];
