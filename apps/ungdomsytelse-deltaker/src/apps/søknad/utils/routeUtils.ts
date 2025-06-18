import { Steg } from '../types';

export const SøknadRoutes = {
    KONTONUMMER: '/soknad/steg/kontonummer',
    BARN: '/soknad/steg/barn',
    OPPSUMMERING: '/soknad/steg/oppsummering',
    KVITTERING: '/soknad/kvittering',
    VELKOMMEN: '/soknad',
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
