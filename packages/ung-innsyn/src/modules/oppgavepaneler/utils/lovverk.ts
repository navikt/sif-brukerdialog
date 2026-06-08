import { ParsedOppgavetype } from '@sif/api/ung-brukerdialog';

export type Lovlenke = {
    url: string;
    tekst: string;
};

/**
 * Bekreft_endret_startdato:

§§ 12 tredje ledd og 13 fjerde ledd i arbeidsmarkedsloven
§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Bekreft_endret_sluttdato:

§§ 12 tredje ledd og 13 fjerde ledd i arbeidsmarkedsloven
§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Bekreft_endret_periode:

§§ 12 tredje ledd og 13 fjerde ledd i arbeidsmarkedsloven
§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Bekreft_avvik_registerinntekt:

§ 13 fjerde ledd i arbeidsmarkedsloven
§ 11 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Rapporter_inntekt:

§ 13 fjerde ledd i arbeidsmarkedsloven
§ 11 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Søk_ytelse:

§§ 12 tredje ledd og 13 fjerde ledd i arbeidsmarkedsloven
§ 8 jf. § 3 og §§ 6, 9 og 10 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse


Bekreft_automatisk_opphør:

§§ 12 tredje ledd og 13 fjerde ledd i arbeidsmarkedsloven
§ 8 jf. § 3 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse

 */
export const LoverOgLenker = {
    forskriftUngdomsprogrammet: {
        url: 'https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182',
        tekst: '§ 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra 1. august 2025) (lovdata.no)',
    },
    /** Endret periode upy */
    arbeidsmarkedslovenParagraf12_13: {
        url: 'https://lovdata.no/lov/2004-12-10-76/§12',
        tekst: '§ 12 tredje ledd og § 13 fjerde ledd i arbeidsmarkedsloven',
    },
    /** Rapporter inntekt, Avvik inntekt */
    arbeidsmarkedslovenParagraf13: {
        url: 'https://lovdata.no/lov/2004-12-10-76/§13',
        tekst: '§ 13 fjerde ledd i arbeidsmarkedsloven',
    },
} satisfies Record<string, Lovlenke>;

export const getLovLenkerForOppgave = (oppgavetype: ParsedOppgavetype): Lovlenke[] => {
    switch (oppgavetype) {
        case ParsedOppgavetype.BEKREFT_BOSTED:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.BEKREFT_ENDRET_STARTDATO:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.RAPPORTER_INNTEKT:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf13, LoverOgLenker.forskriftUngdomsprogrammet];
        case ParsedOppgavetype.SØK_YTELSE:
            return [LoverOgLenker.arbeidsmarkedslovenParagraf12_13];
        default:
            return [];
    }
};
