import { Steg } from '../types';

export const SøknadRoutes = {
    KONTONUMMER: '/soknad/kontonummer',
    BARN: '/soknad/barn',
    OPPSUMMERING: '/soknad/oppsummering',
    KVITTERING: '/soknad/kvittering',
    VELKOMMEN: '/',
};

export const getStegRoute = (steg: Steg): string => {
    switch (steg) {
        case Steg.KONTONUMMER:
            return SøknadRoutes.KONTONUMMER;
        case Steg.BARN:
            return SøknadRoutes.BARN;
        case Steg.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
    }
};
