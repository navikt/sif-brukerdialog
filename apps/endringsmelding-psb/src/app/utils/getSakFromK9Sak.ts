import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak } from '../types/K9Sak';
import { OpptjeningAktivitetArbeidstaker, OpptjeningAktiviteter, Sak, OpptjeningAktivitetType } from '../types/Sak';

export const getOpptjeningsaktiviteter = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): OpptjeningAktiviteter => {
    const opptjeningArbeidstaker: OpptjeningAktivitetArbeidstaker[] = [];

    const { arbeidstaker, frilanser, selvstendig } = k9Sak.ytelse.opptjeningAktivitet;

    (arbeidstaker || []).forEach((aktivitet) => {
        const arbeidsgiver = arbeidsgivere.find(({ id }) => id === aktivitet.info.organisasjonsnummer);
        if (arbeidsgiver) {
            opptjeningArbeidstaker.push({
                type: OpptjeningAktivitetType.arbeidstaker,
                arbeidsgiver,
                ...aktivitet,
            });
        }
    });

    return {
        arbeidstaker: opptjeningArbeidstaker,
        frilanser:
            frilanser !== undefined
                ? {
                      type: OpptjeningAktivitetType.frilanser,
                      ...frilanser,
                  }
                : undefined,
        selvstendingNæringsdrivende:
            selvstendig !== undefined
                ? {
                      type: OpptjeningAktivitetType.selvstendigNæringsdrivende,
                      ...selvstendig,
                  }
                : undefined,
    };
};

export const getSakFromK9Sak = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): Sak | undefined => {
    return {
        barn: k9Sak.barn,
        opptjeningAktivitet: getOpptjeningsaktiviteter(k9Sak, arbeidsgivere),
    };
};
