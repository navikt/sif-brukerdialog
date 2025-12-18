export type JaNei = 'ja' | 'nei';
export type TypeLivsoppholdsytelse = 'økonomisk' | 'annen';

export interface SjekklisteValues {
    alder?: JaNei;
    behov?: JaNei;
    avklart?: JaNei;
    mottarYtelser?: JaNei;
    typeLivsoppholdsytelse?: TypeLivsoppholdsytelse;
    skalStanses?: JaNei;
}

export enum AvslagÅrsak {
    alder = 'alder',
    behov = 'behov',
    avklart = 'avklart',
    skalIkkeStanses = 'skalIkkeStanses',
}

export interface SjekklisteVisning {
    visBehov: boolean;
    visAvklart: boolean;
    visMottarYtelser: boolean;
    visTypeLivsoppholdsytelse: boolean;
    visSkalStanses: boolean;
}

export const getSjekklisteVisning = (values: SjekklisteValues): SjekklisteVisning => {
    const visBehov = values.alder === 'ja';
    const visAvklart = visBehov && values.behov === 'ja';
    const visMottarYtelser = visAvklart && values.avklart === 'ja';
    const visTypeLivsoppholdsytelse = visMottarYtelser && values.mottarYtelser === 'ja';
    const visSkalStanses = visTypeLivsoppholdsytelse && values.typeLivsoppholdsytelse === 'annen';

    return {
        visBehov,
        visAvklart,
        visMottarYtelser,
        visTypeLivsoppholdsytelse,
        visSkalStanses,
    };
};

export const getAvslagÅrsak = (values: SjekklisteValues, visning: SjekklisteVisning): AvslagÅrsak | undefined => {
    if (values.alder === 'nei') return AvslagÅrsak.alder;
    if (values.behov === 'nei') return AvslagÅrsak.behov;
    if (values.avklart === 'nei') return AvslagÅrsak.avklart;
    if (visning.visSkalStanses && values.skalStanses === 'nei') return AvslagÅrsak.skalIkkeStanses;
    return undefined;
};

export const alleSpørsmålBesvart = (values: SjekklisteValues, visning: SjekklisteVisning): boolean => {
    if (values.alder === undefined) return false;
    if (visning.visBehov && values.behov === undefined) return false;
    if (visning.visAvklart && values.avklart === undefined) return false;
    if (visning.visMottarYtelser && values.mottarYtelser === undefined) return false;
    if (visning.visTypeLivsoppholdsytelse && values.typeLivsoppholdsytelse === undefined) return false;
    if (visning.visSkalStanses && values.skalStanses === undefined) return false;
    return true;
};

export const kanDeltakerMeldesInn = (values: SjekklisteValues): boolean => {
    const visning = getSjekklisteVisning(values);
    const avslagÅrsak = getAvslagÅrsak(values, visning);
    return alleSpørsmålBesvart(values, visning) && avslagÅrsak === undefined;
};
