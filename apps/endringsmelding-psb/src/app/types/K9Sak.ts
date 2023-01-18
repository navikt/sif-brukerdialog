import { DateDurationMap, DateRange, Duration, ISODate, ISODateRange } from '@navikt/sif-common-utils';
import { DagerIkkeSøktForMap, DagerSøktForMap } from './';

export type TidEnkeltdag = DateDurationMap;

export interface ArbeidsukeTimer {
    dag: Duration;
    uke: Duration;
}

export interface Arbeidsuke {
    isoDateRange: string;
    periode: DateRange;
    dagerMap: ArbeidstidEnkeltdagMap;
    faktisk: ArbeidsukeTimer;
    normalt: ArbeidsukeTimer;
    /** Utledet info */
    meta: {
        antallArbeidsdager: number;
        ukenummer: number;
        årstall: number;
    };
}

export interface ArbeidsukeMap {
    [key: ISODateRange]: Arbeidsuke;
}
export interface AktivitetArbeidstid {
    arbeidsdager: ArbeidstidEnkeltdagMap;
    arbeidsuker: ArbeidsukeMap;
}

export type ArbeidstidEnkeltdagMap = {
    [key: ISODate]: {
        faktisk: Duration;
        normalt: Duration;
    };
};

export type ArbeidstakerMap = {
    [id: string]: AktivitetArbeidstid;
};

export interface YtelseArbeidstid {
    arbeidstakerMap?: ArbeidstakerMap;
    frilanserArbeidstidInfo?: AktivitetArbeidstid;
    selvstendigNæringsdrivendeArbeidstidInfo?: AktivitetArbeidstid;
}

export interface SakMedMeta {
    sak: K9Sak;
    meta: SakMetadata;
}

export interface Barn {
    fødselsdato: Date;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktørId: string;
    identitetsnummer: string;
}
export interface K9OpptjeningAktivitetFrilanser {
    startdato: Date;
    sluttdato?: Date;
    jobberFortsattSomFrilanser: boolean;
}

interface Ytelse {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: { fødselsdato?: Date; norskIdentitetsnummer: string };
    søknadsperioder: DateRange[];
    opptjeningAktivitet: {
        frilanser?: K9OpptjeningAktivitetFrilanser;
    };
    arbeidstidInfo: YtelseArbeidstid;
}

export interface K9Sak {
    søknadId: string;
    språk: string;
    mottattDato: Date;
    barn: Barn;
    søker: {
        norskIdentitetsnummer: string;
    };
    ytelse: Ytelse;
}

export interface SakMetadata {
    /** Dato endring gjennomføres på (dagens dato) */
    endringsdato: Date;

    /** Hele perioden som bruker kan gjøre endringer innenfor, avgrenset til 3 måned bakover og 12 måneder
     * fremover i tid. Avkortet dersom søknadsperioder er kortere.
     */
    endringsperiode: DateRange;

    /** Dager det er søkt for */
    dagerSøktForMap: DagerSøktForMap;

    /** Dager det ikke er søkt for */
    dagerIkkeSøktForMap: DagerIkkeSøktForMap;

    /** Søknadsperioder */
    søknadsperioder: DateRange[];

    /** Måneder som har dager det er søkt om */
    alleMånederISøknadsperiode: DateRange[];

    /** Måneder som har dager det er søkt om */
    månederMedSøknadsperiodeMap: MånedMedSøknadsperioderMap;

    /** Antall måneder som ikke har dager det er søkt for */
    antallMånederUtenSøknadsperiode: number;

    /** Flagg dersom månedene går over flere år */
    søknadsperioderGårOverFlereÅr: boolean;

    /** Utilgjengelige datoer */
    datoerIkkeSøktFor: Date[];

    /** Utilgjengelige datoer per måned */
    datoerIkkeSøktForIMåned: { [månedIsoString: string]: Date[] };
}

export type MånedMedSøknadsperioderMap = {
    [yearMonthKey: string]: DateRange[];
};
