import { DateDurationMap, DateRange } from '@navikt/sif-common-utils';
import { DagerIkkeSøktForMap, DagerSøktForMap } from '.';

export type TidEnkeltdag = DateDurationMap; // { [isoDateString: string]: { hours: string; minutes: string } };

export type ArbeidstidEnkeltdagSak = {
    faktisk: DateDurationMap;
    normalt: DateDurationMap;
};

export type ArbeidstakerMap = {
    [id: string]: ArbeidstidEnkeltdagSak;
};

export interface YtelseArbeidstid {
    arbeidstakerMap?: ArbeidstakerMap;
    frilanser?: ArbeidstidEnkeltdagSak;
    selvstendig?: ArbeidstidEnkeltdagSak;
}

export interface SakMedMeta {
    sak: Sak;
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

export interface OpptjeningAktivitetFrilanser {
    startdato: Date;
    sluttdato?: Date;
    jobberFortsattSomFrilanser: boolean;
}

export interface Sak {
    søknadId: string;
    språk: string;
    mottattDato: Date;
    barn: Barn;
    søker: {
        norskIdentitetsnummer: string;
    };
    ytelse: {
        type: 'PLEIEPENGER_SYKT_BARN';
        barn: { fødselsdato?: Date; norskIdentitetsnummer: string };
        søknadsperioder: DateRange[];
        opptjeningAktivitet: {
            frilanser?: OpptjeningAktivitetFrilanser;
        };
        tilsynsordning: {
            enkeltdager: DateDurationMap;
        };
        arbeidstid: YtelseArbeidstid;
    };
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
