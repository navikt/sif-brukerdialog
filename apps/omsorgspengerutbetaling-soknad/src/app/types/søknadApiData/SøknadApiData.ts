import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { ApiAktivitet } from '../AktivitetFravær';
import { BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { ISODate } from '@navikt/sif-common-utils/lib/types';
import { FrilansApiData } from './FrilansApiData';
import { SelvstendigApiData } from './SelvstendigApiData';

export type ISO8601Duration = string;

export interface UtenlandsoppholdApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
    erEØSLand: boolean;
}

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdApiData[];
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdApiData[];
}

export interface UtbetalingsperiodeApi {
    fraOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    tilOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    antallTimerBorte: string | null; // f eks PT5H30M | "null" (type Duration)
    antallTimerPlanlagt: string | null; // f eks PT5H30M | "null" (type Duration)
    aktivitetFravær: ApiAktivitet[];
    // årsak: FraværÅrsak; // Deprecated
}

export enum RegistrertBarnTypeApi {
    'fraOppslag' = 'FRA_OPPSLAG',
}

export interface ApiBarn {
    identitetsnummer?: string;
    aktørId?: string;
    fødselsdato: ISODate;
    navn: string;
    utvidetRett?: boolean;
    type: RegistrertBarnTypeApi | BarnType;
}

export interface SøknadApiData {
    id: string;
    språk: Locale;

    harForståttRettigheterOgPlikter: boolean;

    barn: ApiBarn[]; // Dine barn
    harDekketTiFørsteDagerSelv?: boolean; // Dine barn

    utbetalingsperioder: UtbetalingsperiodeApi[]; // perioder
    opphold: UtenlandsoppholdApiData[]; // perioder utenlandsopphold

    vedlegg: string[]; // legeerklæring

    frilans: FrilansApiData; // arbeidssituasjon frilans
    selvstendigNæringsdrivende: SelvstendigApiData; // arbeidssituasjon

    medlemskap: MedlemskapApiData; // medlemskap

    harBekreftetOpplysninger: boolean;
}
