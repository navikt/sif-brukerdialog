import { Spørsmål, SøknadSvar } from '../context/søknadContext';
import { Steg } from '../types/Steg';

export const søknadSteg = [Steg.OPPSTART, Steg.BARN, Steg.KONTONUMMER, Steg.OPPSUMMERING];

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

export const erStegTilgjengelig = (steg: Steg, svar: SøknadSvar, harKontonummer: boolean): boolean => {
    return getTilgjengeligeSteg(svar, harKontonummer).find((s) => s === steg) !== undefined;
};

export const getTilgjengeligeSteg = (svar: SøknadSvar, harKontonummer: boolean): Steg[] => {
    const tilgjengeligeSteg: Steg[] = [];

    const velkommenOk: boolean = svar[Spørsmål.BEKREFTER] === true;
    const oppstartOk: boolean = velkommenOk && svar[Spørsmål.OPPSTART] !== undefined;
    const barnOk: boolean = oppstartOk && svar[Spørsmål.BARN] !== undefined;
    const kontonummerOk: boolean = barnOk && (harKontonummer ? svar[Spørsmål.KONTONUMMER] !== undefined : true);

    if (velkommenOk) {
        tilgjengeligeSteg.push(Steg.OPPSTART);
    }
    if (oppstartOk) {
        tilgjengeligeSteg.push(Steg.BARN);
    }
    if (barnOk) {
        tilgjengeligeSteg.push(Steg.KONTONUMMER);
    }
    if (kontonummerOk) {
        tilgjengeligeSteg.push(Steg.OPPSUMMERING);
    }

    return tilgjengeligeSteg;
};
