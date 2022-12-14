import { DateRange } from 'react-day-picker';
import { Arbeidsgiver } from './Arbeidsgiver';

import { ArbeidsukeMap, Barn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

interface ArbeidAktivitetPerioder {
    allePerioder: DateRange[];
    samletPeriode: DateRange;
    arbeidsuker: ArbeidsukeMap;
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
    arbeidstakerArr: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivende;
}

export interface Sak {
    barn: Barn;
    arbeidAktiviteter: ArbeidAktiviteter;
    ytelse: {
        type: string;
    };
}
