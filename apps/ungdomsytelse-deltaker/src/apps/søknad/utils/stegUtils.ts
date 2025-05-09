import { KontonummerInfo, Spørsmål, Steg, SøknadSvar } from '../types';

export const søknadSteg = [Steg.KONTONUMMER, Steg.BARN, Steg.OPPSUMMERING];

export const getStegIndex = (steg: Steg): number => {
    return søknadSteg.findIndex((s) => s === steg);
};

export const getSkjemaStegIndex = (steg: Steg): number => {
    return søknadSteg.findIndex((s) => s === steg);
};

export const getStegFraPath = (path: string): Steg | undefined => {
    const steg = søknadSteg.find((s) => path.includes(s));
    if (steg) {
        return steg;
    }
    return;
};

export const getNesteSkjemaSteg = (steg: Steg): Steg | undefined => {
    const index = getSkjemaStegIndex(steg);
    return index > steg.length - 1 ? søknadSteg[index + 1] : undefined;
};

export const getForrigeSkjemaSteg = (steg: Steg): Steg | undefined => {
    const index = getSkjemaStegIndex(steg);
    return index > 0 ? søknadSteg[index - 1] : undefined;
};

export const getTilgjengeligeSteg = (svar: SøknadSvar, kontonummerInfo: KontonummerInfo): Steg[] => {
    const tilgjengeligeSteg: Steg[] = [];

    const velkommenOk: boolean = svar[Spørsmål.FORSTÅR_PLIKTER] === true;
    const kontonummerOk: boolean = kontonummerInfo.harKontonummer ? svar[Spørsmål.KONTONUMMER] !== undefined : true;
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
    return getTilgjengeligeSteg(svar, kontonummerInfo).find((s) => s === steg) !== undefined;
};
