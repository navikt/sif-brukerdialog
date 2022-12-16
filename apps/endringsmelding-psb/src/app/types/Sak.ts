import { Arbeidsgiver } from './Arbeidsgiver';
import { ArbeidsukeMap, Barn } from './K9Sak';

export enum ArbeidAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export interface ArbeidAktivitetArbeidstaker {
    id: string;
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    arbeidsuker: ArbeidsukeMap;
}
export interface ArbeidAktivitetFrilanser {
    id: string;
    type: ArbeidAktivitetType.frilanser;
    arbeidsuker: ArbeidsukeMap;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende {
    id: string;
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
    arbeidsuker: ArbeidsukeMap;
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
