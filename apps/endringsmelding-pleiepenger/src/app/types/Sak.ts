import { DateRange, Duration, ISODate } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from './Arbeidsgiver';
import { DateRangeMap } from './DateRangeMap';
import { K9SakBarn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export type FaktiskOgNormalArbeidstid = {
    faktisk: Duration;
    normalt: Duration;
};

export type ArbeidstidEnkeltdagMap = {
    [key: ISODate]: FaktiskOgNormalArbeidstid;
};

export interface ArbeidsukeTimer {
    dag: Duration;
    uke: Duration;
}

export interface Arbeidsuke {
    isoDateRange: string;
    periode: DateRange;
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap;
    faktisk: ArbeidsukeTimer;
    normalt: ArbeidsukeTimer;
    antallDagerMedArbeidstid: number;
}

export type ArbeidsukeMap = DateRangeMap<Arbeidsuke>;

export interface PeriodeMedArbeidstid {
    periode: DateRange;
    arbeidsuker: ArbeidsukeMap;
}

interface ArbeidAktivitetBase {
    id: string;
    type: ArbeidAktivitetType;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
    harPerioderFørEndringsperiode: boolean;
    harPerioderEtterEndringsperiode: boolean;
}

export interface ArbeidAktivitetArbeidstaker extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
}
export interface ArbeidAktivitetFrilanser extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.frilanser;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
}

export type ArbeidAktivitet =
    | ArbeidAktivitetArbeidstaker
    | ArbeidAktivitetFrilanser
    | ArbeidAktivitetSelvstendigNæringsdrivende;

export interface ArbeidAktiviteter {
    arbeidstakerArktiviteter: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivende;
}

export interface Sak {
    barn: K9SakBarn;
    arbeidAktiviteter: ArbeidAktiviteter;
    ytelse: {
        type: string;
    };
}
