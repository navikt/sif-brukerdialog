import { Arbeidsgiver } from './Arbeidsgiver';

import {
    Barn,
    K9OpptjeningAktivitetArbeidstaker,
    K9OpptjeningAktivitetFrilanser,
    K9OpptjeningAktivitetSelvstendig,
} from './K9Sak';

export enum OpptjeningAktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export interface OpptjeningAktivitetArbeidstaker extends K9OpptjeningAktivitetArbeidstaker {
    type: OpptjeningAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
}
export interface OpptjeningAktivitetFrilanser extends K9OpptjeningAktivitetFrilanser {
    type: OpptjeningAktivitetType.frilanser;
}

export interface OpptjeningAktivitetSelvstendigNæringsdrivende extends K9OpptjeningAktivitetSelvstendig {
    type: OpptjeningAktivitetType.selvstendigNæringsdrivende;
}

export type OpptjeningAktivitet =
    | OpptjeningAktivitetArbeidstaker
    | OpptjeningAktivitetFrilanser
    | OpptjeningAktivitetSelvstendigNæringsdrivende;

export interface OpptjeningAktiviteter {
    arbeidstaker: OpptjeningAktivitetArbeidstaker[];
    frilanser?: OpptjeningAktivitetFrilanser;
    selvstendingNæringsdrivende?: OpptjeningAktivitetSelvstendigNæringsdrivende;
}

export interface Sak {
    barn: Barn;
    opptjeningAktivitet: OpptjeningAktiviteter;
}
