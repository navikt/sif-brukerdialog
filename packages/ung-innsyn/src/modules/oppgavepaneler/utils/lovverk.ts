import { OppgaveType, OppgaveYtelsetype } from '@navikt/ung-brukerdialog-api';

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
    forskriftAktivitetspenger: {
        url: 'https://www.nav.no#todo',
        tekst: '[TODO] Forskrift om aktivitetspenger (lovdata.no)',
    },
    forskriftUngdomsprogrammet: {
        url: 'https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182',
        tekst: '§ 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra 1. august 2025) (lovdata.no)',
    },
    /** Endret periode upy */
    arbeidsmarkedslovenP_12_13: {
        url: 'https://lovdata.no/lov/2004-12-10-76/§12',
        tekst: '§ 12 tredje ledd og § 13 fjerde ledd i arbeidsmarkedsloven (lovdata.no)',
    },
    /** Rapporter inntekt, Avvik inntekt */
    arbeidsmarkedslovenP_13: {
        url: 'https://lovdata.no/lov/2004-12-10-76/§13',
        tekst: '§ 13 fjerde ledd i arbeidsmarkedsloven (lovdata.no)',
    },
} satisfies Record<string, Lovlenke>;

/** Denne er under arbeid frem til alle referanser for aktivitetspenger er avklart */
export const getLovLenkerForOppgave = (
    oppgavetype: OppgaveType,
    oppgaveYtelsetype: OppgaveYtelsetype,
    /** Settes true hvis en skal returnere lenker ut fra ytelse og oppgavetype */
    utvidetVersjon: boolean = false,
): Lovlenke[] => {
    if (!utvidetVersjon) {
        return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftUngdomsprogrammet];
    }
    if (!oppgaveYtelsetype) {
        return [];
    }
    switch (oppgavetype) {
        /** Aktivitetspenger */
        case OppgaveType.BEKREFT_BOSTED:
            return [LoverOgLenker.arbeidsmarkedslovenP_12_13, LoverOgLenker.forskriftAktivitetspenger];

        /** Ungdomsytelse */
        case OppgaveType.BEKREFT_ENDRET_PERIODE:
        case OppgaveType.BEKREFT_ENDRET_SLUTTDATO:
        case OppgaveType.BEKREFT_ENDRET_STARTDATO:
        case OppgaveType.BEKREFT_OPPHOR_VED_MAKSDATO:
            return [LoverOgLenker.arbeidsmarkedslovenP_12_13, LoverOgLenker.forskriftUngdomsprogrammet];
        case OppgaveType.RAPPORTER_INNTEKT:
            return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftUngdomsprogrammet];

        /** Felles for aktivitetspenger og ungdomsytelse */
        case OppgaveType.BEKREFT_AVVIK_REGISTERINNTEKT:
            if (oppgaveYtelsetype === OppgaveYtelsetype.AKTIVITETSPENGER) {
                return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftAktivitetspenger];
            } else {
                return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftUngdomsprogrammet];
            }
        case OppgaveType.SØK_YTELSE:
            if (oppgaveYtelsetype === OppgaveYtelsetype.AKTIVITETSPENGER) {
                return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftAktivitetspenger];
            } else {
                return [LoverOgLenker.arbeidsmarkedslovenP_13, LoverOgLenker.forskriftUngdomsprogrammet];
            }
        default:
            return [];
    }
};
