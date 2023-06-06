import { ArbeidstidSøknadsdata, LovbestemtFerieSøknadsdata } from '../types';

export const harEndretArbeidstid = (arbeidstid: ArbeidstidSøknadsdata | undefined): boolean => {
    if (!arbeidstid) {
        return false;
    }
    if (arbeidstid.arbeidsaktivitet) {
        return Object.keys(arbeidstid.arbeidsaktivitet)
            .map((key) => arbeidstid.arbeidsaktivitet[key])
            .some((a) => Object.keys(a.endringer).length > 0);
    }
    return false;
};

export const harFjernetLovbestemtFerie = (ferie: LovbestemtFerieSøknadsdata | undefined): boolean => {
    if (!ferie) {
        return false;
    }
    return ferie.feriedagerMeta.datoerFjernet.length > 0;
};
