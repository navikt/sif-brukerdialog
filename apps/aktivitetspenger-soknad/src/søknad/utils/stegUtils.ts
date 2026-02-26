/* eslint-disable no-constant-condition */
import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';

import { HarKontonummerEnum } from '../steg/oppsummering/oppsummeringUtils';
import { SøknadSvar, Spørsmål, Steg } from '../types';

export const søknadSteg = [Steg.KONTONUMMER, Steg.BOSTED, Steg.MEDLEMSKAP, Steg.BARN, Steg.OPPSUMMERING];

export const getSkjemaStegIndex = (steg: Steg): number => {
    return søknadSteg.indexOf(steg);
};

export const getStegFraPath = (path: string): Steg | undefined => {
    const steg = søknadSteg.find((s) => path.includes(s));
    if (steg) {
        return steg;
    }
};

export const getNextSteg = (steg: Steg): Steg => {
    const index = getSkjemaStegIndex(steg);
    if (index === -1) {
        throw new Error(`Steg ${steg} finnes ikke i søknaden`);
    }
    if (index === søknadSteg.length - 1) {
        throw new Error(`Steg ${steg} er siste steg i søknaden`);
    }
    return søknadSteg[index + 1];
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
        tilgjengeligeSteg.push(Steg.BOSTED);
    }
    if (true) {
        tilgjengeligeSteg.push(Steg.MEDLEMSKAP);
    }
    if (true) {
        tilgjengeligeSteg.push(Steg.BARN);
    }
    if (barnOk) {
        tilgjengeligeSteg.push(Steg.OPPSUMMERING);
    }

    return tilgjengeligeSteg;
};

export const erStegTilgjengelig = (steg: Steg, svar: SøknadSvar, kontonummerInfo: KontonummerInfo): boolean => {
    return getTilgjengeligeSteg(svar, kontonummerInfo).some((s) => s === steg);
};
