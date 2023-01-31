import { Arbeidsgiver } from './Arbeidsgiver';
import { ArbeidsukeMap, Barn } from './K9Sak';
import { PeriodeMedArbeidstid } from './PeriodeMedArbeidstid';

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
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}
export interface ArbeidAktivitetFrilanser {
    id: string;
    type: ArbeidAktivitetType.frilanser;
    arbeidsuker: ArbeidsukeMap;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende {
    id: string;
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
    arbeidsuker: ArbeidsukeMap;
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
    barn: Barn;
    arbeidAktiviteter: ArbeidAktiviteter;
    ytelse: {
        type: string;
    };
}
