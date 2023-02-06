import { DateRange, Duration, ISODate, ISODateRange } from '@navikt/sif-common-utils/lib';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9SakBarn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export type ArbeidstidEnkeltdagMap = {
    [key: ISODate]: {
        faktisk: Duration;
        normalt: Duration;
    };
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

export interface ArbeidsukeMap {
    [key: ISODateRange]: Arbeidsuke;
}

export interface PeriodeMedArbeidstid {
    periode: DateRange;
    enkeltdager: ArbeidstidEnkeltdagMap;
    arbeidsuker: ArbeidsukeMap;
}

export interface ArbeidAktivitetArbeidstaker {
    id: string;
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}
interface ArbeidAktivitetFrilanser {
    id: string;
    type: ArbeidAktivitetType.frilanser;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}

interface ArbeidAktivitetSelvstendigNæringsdrivende {
    id: string;
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
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
