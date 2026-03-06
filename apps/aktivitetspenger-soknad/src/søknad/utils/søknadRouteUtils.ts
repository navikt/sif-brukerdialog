import { Steg } from '../types';

export const SøknadRoutePaths = {
    VELKOMMEN: '',
    KONTONUMMER: '/steg/kontonummer',
    BARN: '/steg/barn',
    BOSTED: '/steg/bosted',
    MEDLEMSKAP: '/steg/medlemskap',
    OPPSUMMERING: '/steg/oppsummering',
    KVITTERING: '/kvittering',
};

export const getSøknadStegRoute = (steg: Steg): string => {
    switch (steg) {
        case Steg.KONTONUMMER:
            return SøknadRoutePaths.KONTONUMMER;
        case Steg.BARN:
            return SøknadRoutePaths.BARN;
        case Steg.BOSTED:
            return SøknadRoutePaths.BOSTED;
        case Steg.MEDLEMSKAP:
            return SøknadRoutePaths.MEDLEMSKAP;
        case Steg.OPPSUMMERING:
            return SøknadRoutePaths.OPPSUMMERING;
    }
};
