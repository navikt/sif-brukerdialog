import { Arbeidsgiver } from './Arbeidsgiver';
import { Barn } from './K9Sak';
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
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}
export interface ArbeidAktivitetFrilanser {
    id: string;
    type: ArbeidAktivitetType.frilanser;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende {
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
    barn: Barn;
    arbeidAktiviteter: ArbeidAktiviteter;
    ytelse: {
        type: string;
    };
}
export interface Pleiepengesak {
    type: 'PLEIEPENGER_SYKT_BARN';
    barn: Barn;
    arbeidAktiviteter: ArbeidAktiviteter;
}
