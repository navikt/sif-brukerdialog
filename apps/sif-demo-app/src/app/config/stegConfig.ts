import { StegConfig } from '@rammeverk/types';

// Demo søknadsdata type
export interface DemoSøknadsdata {
    steg1?: {
        navn: string;
    };
    steg2?: {
        epost: string;
    };
    oppsummering?: {
        bekreftet: boolean;
    };
}

// Skjemadata typer per steg
export interface Steg1Skjemadata {
    navn: string;
}

export interface Steg2Skjemadata {
    epost: string;
}

export interface OppsummeringSkjemadata {
    bekreftet: boolean;
}

// StegConfig
export const stegConfig: StegConfig<DemoSøknadsdata> = {
    steg1: {
        id: 'steg1',
        route: 'personalia',
        tittel: 'Personalia',
        erTilgjengelig: () => true,
        toSkjemadata: (søknadsdata) => ({
            navn: søknadsdata.steg1?.navn ?? '',
        }),
        toSøknadsdata: (skjemadata) => ({
            steg1: { navn: (skjemadata as Steg1Skjemadata).navn },
        }),
    },
    steg2: {
        id: 'steg2',
        route: 'kontakt',
        tittel: 'Kontaktinfo',
        erTilgjengelig: (søknadsdata) => søknadsdata.steg1 !== undefined,
        toSkjemadata: (søknadsdata) => ({
            epost: søknadsdata.steg2?.epost ?? '',
        }),
        toSøknadsdata: (skjemadata) => ({
            steg2: { epost: (skjemadata as Steg2Skjemadata).epost },
        }),
    },
    oppsummering: {
        id: 'oppsummering',
        tittel: 'Oppsummering',
        erTilgjengelig: (søknadsdata) => søknadsdata.steg1 !== undefined && søknadsdata.steg2 !== undefined,
        toSkjemadata: () => ({ bekreftet: false }),
        toSøknadsdata: (skjemadata) => ({
            oppsummering: { bekreftet: (skjemadata as OppsummeringSkjemadata).bekreftet },
        }),
    },
};

export const stegRekkefølge = ['steg1', 'steg2', 'oppsummering'];
