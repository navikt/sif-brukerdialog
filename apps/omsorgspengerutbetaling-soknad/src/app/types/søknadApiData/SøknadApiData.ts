import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { ApiAktivitet } from '../AktivitetFravær';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { ISODate } from '@navikt/sif-common-utils/src/types';
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
    type: RegistrertBarnTypeApi | BarnType;
}
export interface DineBarnApiData {
    barn: ApiBarn[];
    harSyktBarn?: boolean;
    harAleneomsorg?: boolean;
    harDekketTiFørsteDagerSelv?: boolean;
}

export type YesNoSvar = boolean;

export type Spørsmål = string;

export interface YesNoSpørsmålOgSvar {
    spørsmål: Spørsmål;
    svar: YesNoSvar;
}

export interface SøknadApiData extends DineBarnApiData {
    søkerNorskIdent: string;
    id: string;
    språk: Locale;

    bekreftelser: {
        harBekreftetOpplysninger: boolean;
        harForståttRettigheterOgPlikter: boolean;
    };

    spørsmål: YesNoSpørsmålOgSvar[];
    utbetalingsperioder: UtbetalingsperiodeApi[]; // perioder
    opphold: UtenlandsoppholdApiData[]; // perioder utenlandsopphold

    vedlegg: string[]; // legeerklæring url

    frilans?: FrilansApiData; // arbeidssituasjon frilans
    selvstendigNæringsdrivende?: VirksomhetApiData; // arbeidssituasjon

    bosteder: UtenlandsoppholdApiData[]; // medlemskap
}
