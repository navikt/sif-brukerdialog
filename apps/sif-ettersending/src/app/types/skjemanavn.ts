import { ApplicationType } from './ApplicationType';

export enum SKJEMANAVN {
    pleiepenger = 'Ettersending pleiepenger barn',
    pleiepengerLivetsSluttfase = 'Ettersending pleiepenger livets sluttfase',
    omsorgspenger = 'Ettersending omsorgspenger',
    OMP_UTV_KS = 'Ettersending omsorgspenger utvidet rett - kronisk syke eller funksjonshemming',
    OMP_UT_SNF = 'Ettersending omsorgspenger utbetaling SNF ytelse',
    OMP_UT_ARBEIDSTAKER = 'Ettersending omsorgspenger utbetaling arbeidstaker ytelse',
    OMP_UTV_MA = 'Ettersending omsorgspenger utvidet rett - midlertidig alene',
    OMP_DELE_DAGER = 'Melding om deling av omsorgsdager',
    ukjent = 'Ettersending feil sjemanavn',
}

export const getSkjemanavn = (søknadstype: ApplicationType): SKJEMANAVN => {
    switch (søknadstype) {
        case ApplicationType.pleiepengerBarn:
            return SKJEMANAVN.pleiepenger;
        case ApplicationType.pleiepengerLivetsSluttfase:
            return SKJEMANAVN.pleiepengerLivetsSluttfase;
        case ApplicationType.ekstraomsorgsdager:
            return SKJEMANAVN.OMP_UTV_KS;
        case ApplicationType.utbetaling:
            return SKJEMANAVN.OMP_UT_SNF;
        case ApplicationType.utbetalingarbeidstaker:
            return SKJEMANAVN.OMP_UT_ARBEIDSTAKER;
        case ApplicationType.regnetsomalene:
            return SKJEMANAVN.OMP_UTV_MA;
        case ApplicationType.deling:
            return SKJEMANAVN.OMP_DELE_DAGER;
    }
    return SKJEMANAVN.ukjent;
};
