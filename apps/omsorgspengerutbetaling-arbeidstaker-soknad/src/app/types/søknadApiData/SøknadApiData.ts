import { ISODate } from '@navikt/sif-common-utils/lib';
import { Utbetalingsårsak, ÅrsakNyoppstartet } from '../ArbeidsforholdTypes';
import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';

export type ISO8601Duration = string;

export interface UtenlandsoppholdApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
    erEØSLand: boolean;
}

export type Opphold = UtenlandsoppholdApiData;

export interface ArbeidsgiverDetaljer {
    navn: string;
    organisasjonsnummer: string;
    utbetalingsårsak: Utbetalingsårsak;
    årsakNyoppstartet?: ÅrsakNyoppstartet;
    konfliktForklaring?: string;
    harHattFraværHosArbeidsgiver: boolean;
    arbeidsgiverHarUtbetaltLønn: boolean;
    perioder: Utbetalingsperiode[];
}

export enum RegistrertBarnTypeApi {
    'fraOppslag' = 'FRA_OPPSLAG',
}

export interface ApiBarn {
    identitetsnummer?: string;
    aktørId?: string;
    fødselsdato: ISODate;
    navn: string;
    type: RegistrertBarnTypeApi | BarnType;
}

export enum ApiAktivitet {
    ARBEIDSTAKER = 'ARBEIDSTAKER',
}

export interface Utbetalingsperiode {
    fraOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    tilOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    antallTimerBorte: string | null; // f eks PT5H30M | "null" (type Duration)
    antallTimerPlanlagt: string | null; // f eks PT5H30M | "null" (type Duration)
    årsak: string; // Deprecated - ORDINÆRT_ÅRSAK
    aktivitetFravær: ApiAktivitet[];
}

export interface SøknadApiData {
    id: string;
    språk: Locale;

    bekreftelser: {
        harBekreftetOpplysninger: boolean;
        harForståttRettigheterOgPlikter: boolean;
    };
    barn: ApiBarn[]; // Dine barn
    bosteder: UtenlandsoppholdApiData[]; // medlemskap-siden
    opphold: Opphold[]; // hvis ja på har oppholdt seg i utlandet
    arbeidsgivere: ArbeidsgiverDetaljer[];
    vedlegg: string[]; // legeerklæring
}
