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
    id: string;
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    perioder: ArbeidAktivitetPerioder;
}
export interface ArbeidAktivitetFrilanser {
    id: string;
    type: ArbeidAktivitetType.frilanser;
    perioder: ArbeidAktivitetPerioder;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende {
    id: string;
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
    perioder: ArbeidAktivitetPerioder;
}

export type ArbeidAktivitet =
    | ArbeidAktivitetArbeidstaker
    | ArbeidAktivitetFrilanser
    | ArbeidAktivitetSelvstendigNæringsdrivende;

export interface ArbeidAktiviteter {
    arbeidstaker: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivende;
}

export interface Sak {
    barn: Barn;
    arbeidAktivitet: ArbeidAktiviteter;
}
