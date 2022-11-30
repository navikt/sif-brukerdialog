import { DateRange } from 'react-day-picker';
import { Arbeidsgiver } from './Arbeidsgiver';
import { Barn } from './K9Sak';

export interface OpptjeningAktivitetArbeidstakerSøknad {
    arbeidsgiver: Arbeidsgiver;
    samletPeriode: DateRange;
}

export interface OpptjeningAktivitetSøknad {
    arbeidstaker: OpptjeningAktivitetArbeidstakerSøknad[];
    erFrilanser: boolean;
    erSelvstendingNæringsdrivende: boolean;
}

export interface Sak {
    barn: Barn;
    opptjeningAktivitet: OpptjeningAktivitetSøknad;
}
