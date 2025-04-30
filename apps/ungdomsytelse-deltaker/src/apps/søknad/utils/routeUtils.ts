import { Steg } from '../types/Steg';

export const SøknadRoutes = {
    OPPSTART: '/soknad/oppstart',
    BARN: '/soknad/barn',
    KONTONUMMER: '/soknad/kontonummer',
    OPPSUMMERING: '/soknad/oppsummering',
    KVITTERING: '/soknad/kvittering',
    VELKOMMEN: '/',
};

export const getStegRoute = (steg: Steg): string => {
    switch (steg) {
        case Steg.OPPSTART:
            return SøknadRoutes.OPPSTART;
        case Steg.BARN:
            return SøknadRoutes.BARN;
        case Steg.KONTONUMMER:
            return SøknadRoutes.KONTONUMMER;
        case Steg.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
    }
};
