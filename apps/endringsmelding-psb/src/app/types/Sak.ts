import { DateRange } from 'react-day-picker';
import { Arbeidsgiver } from './Arbeidsgiver';

import { Barn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

interface ArbeidAktivitetPerioder {
    allePerioder: DateRange[];
    samletPeriode: DateRange;
}
export interface ArbeidAktivitetArbeidstaker {
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    perioder: ArbeidAktivitetPerioder;
}
export interface ArbeidAktivitetFrilanser {
    type: ArbeidAktivitetType.frilanser;
    perioder: ArbeidAktivitetPerioder;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivence {
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
    perioder: ArbeidAktivitetPerioder;
}

export type ArbeidAktivitet =
    | ArbeidAktivitetArbeidstaker
    | ArbeidAktivitetFrilanser
    | ArbeidAktivitetSelvstendigNæringsdrivence;

export interface ArbeidAktiviteter {
    arbeidstaker: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendingNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivence;
}

export interface Sak {
    barn: Barn;
    arbeidAktivitet: ArbeidAktiviteter;
}
