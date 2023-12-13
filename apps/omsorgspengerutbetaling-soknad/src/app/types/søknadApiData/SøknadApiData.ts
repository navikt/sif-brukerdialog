import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { ApiAktivitet } from '../AktivitetFravær';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { ISODate } from '@navikt/sif-common-utils/lib/types';
import { FrilansApiData } from './FrilansApiData';
import { VirksomhetApiData } from '@navikt/sif-common-forms-ds';

export type ISO8601Duration = string;

export interface UtenlandsoppholdApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
    erEØSLand: boolean;
}

export interface UtbetalingsperiodeApi {
    fraOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    tilOgMed: ISODate; // @JsonFormat(pattern = "yyyy-MM-dd")
    antallTimerBorte: string | null; // f eks PT5H30M | "null" (type Duration)
    antallTimerPlanlagt: string | null; // f eks PT5H30M | "null" (type Duration)
    aktivitetFravær: ApiAktivitet[];
    årsak: string; // Deprecated
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

export type YesNoSvar = boolean;

export type Spørsmål = string;

export interface YesNoSpørsmålOgSvar {
    spørsmål: Spørsmål;
    svar: YesNoSvar;
}

export interface SøknadApiData {
    id: string;
    språk: Locale;

    bekreftelser: {
        harBekreftetOpplysninger: boolean;
        harForståttRettigheterOgPlikter: boolean;
    };

    spørsmål: YesNoSpørsmålOgSvar[];

    barn: ApiBarn[]; // Dine barn
    harDekketTiFørsteDagerSelv?: boolean; // Dine barn

    utbetalingsperioder: UtbetalingsperiodeApi[]; // perioder
    opphold: UtenlandsoppholdApiData[]; // perioder utenlandsopphold

    vedlegg: string[]; // legeerklæring

    frilans?: FrilansApiData; // arbeidssituasjon frilans
    selvstendigNæringsdrivende?: VirksomhetApiData; // arbeidssituasjon

    bosteder: UtenlandsoppholdApiData[]; // medlemskap
}
