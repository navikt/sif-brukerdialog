import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';

import { HarKontonummerEnum } from '../steg/oppsummering/oppsummeringUtils';
import { SøknadSvar, Spørsmål, Steg } from '../types';

export const søknadSteg = [Steg.KONTONUMMER, Steg.BARN, Steg.OPPSUMMERING];

export const getSkjemaStegIndex = (steg: Steg): number => {
    return søknadSteg.indexOf(steg);
};

export const getStegFraPath = (path: string): Steg | undefined => {
    const steg = søknadSteg.find((s) => path.includes(s));
    if (steg) {
        return steg;
    }
};

export const getTilgjengeligeSteg = (svar: SøknadSvar, kontonummerInfo: KontonummerInfo): Steg[] => {
    const tilgjengeligeSteg: Steg[] = [];

    const velkommenOk: boolean = svar[Spørsmål.FORSTÅR_PLIKTER] === true;
    const kontonummerOk: boolean =
        kontonummerInfo.harKontonummer === HarKontonummerEnum.JA ? svar[Spørsmål.KONTONUMMER] !== undefined : true;
    const barnOk: boolean = kontonummerOk && svar[Spørsmål.BARN] !== undefined;

    if (velkommenOk) {
        tilgjengeligeSteg.push(Steg.KONTONUMMER);
    }
    if (kontonummerOk) {
        tilgjengeligeSteg.push(Steg.BARN);
    }
    if (barnOk) {
        tilgjengeligeSteg.push(Steg.OPPSUMMERING);
    }

    return tilgjengeligeSteg;
};

export const erStegTilgjengelig = (steg: Steg, svar: SøknadSvar, kontonummerInfo: KontonummerInfo): boolean => {
    return getTilgjengeligeSteg(svar, kontonummerInfo).some((s) => s === steg) !== undefined;
};
