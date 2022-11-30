import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak } from '../types/K9Sak';
import { OpptjeningAktivitetArbeidstakerSøknad, OpptjeningAktivitetSøknad, Sak } from '../types/Sak';

export const getOpptjeningsaktiviteter = (sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): OpptjeningAktivitetSøknad => {
    const opptjeningArbeidstaker: OpptjeningAktivitetArbeidstakerSøknad[] = [];

    (sak.ytelse.opptjeningAktivitet.arbeidstaker || []).map(({ organisasjonsnummer, samletPeriode }) => {
        const arbeidsgiver = arbeidsgivere.find(({ id }) => id === organisasjonsnummer);
        if (arbeidsgiver) {
            opptjeningArbeidstaker.push({
                arbeidsgiver,
                samletPeriode,
            });
        }
    });
    return {
        arbeidstaker: opptjeningArbeidstaker,
        erFrilanser: sak.ytelse.arbeidstid.frilanser !== undefined,
        erSelvstendingNæringsdrivende: sak.ytelse.arbeidstid.selvstendig !== undefined,
    };
};

export const getSakFromK9Sak = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): Sak | undefined => {
    return {
        barn: k9Sak.barn,
        opptjeningAktivitet: getOpptjeningsaktiviteter(k9Sak, arbeidsgivere),
    };
};
