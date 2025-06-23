import { Steg } from '../types';

export const SøknadRoutes = {
    VELKOMMEN: '/soknad',
    KONTONUMMER: '/soknad/steg/kontonummer',
    BARN: '/soknad/steg/barn',
    OPPSUMMERING: '/soknad/steg/oppsummering',
    KVITTERING: '/soknad/kvittering',
};

export const getSøknadStegRoute = (steg: Steg): string => {
    switch (steg) {
        case Steg.KONTONUMMER:
            return SøknadRoutes.KONTONUMMER;
        case Steg.BARN:
            return SøknadRoutes.BARN;
        case Steg.OPPSUMMERING:
            return SøknadRoutes.OPPSUMMERING;
    }
};
