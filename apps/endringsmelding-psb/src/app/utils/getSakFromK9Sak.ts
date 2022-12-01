import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak } from '../types/K9Sak';
import { Sak, ArbeidAktivitetType, ArbeidAktiviteter, ArbeidAktivitetArbeidstaker } from '../types/Sak';

export const getArbeidAktiviteter = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): ArbeidAktiviteter => {
    const aktivitetArbeidstaker: ArbeidAktivitetArbeidstaker[] = [];

    const {
        arbeidstakerMap = {},
        frilanserArbeidstidInfo,
        selvstendigNæringsdrivendeArbeidstidInfo,
    } = k9Sak.ytelse.arbeidstidInfo;

    Object.keys(arbeidstakerMap).forEach((key) => {
        const { allePerioder, samletPeriode } = arbeidstakerMap[key];
        const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) => arbeidsgiver.id === key);
        if (arbeidsgiver) {
            aktivitetArbeidstaker.push({
                type: ArbeidAktivitetType.arbeidstaker,
                arbeidsgiver,
                perioder: {
                    allePerioder,
                    samletPeriode,
                },
            });
        }
    });

    return {
        arbeidstaker: aktivitetArbeidstaker,
        frilanser:
            frilanserArbeidstidInfo !== undefined
                ? {
                      type: ArbeidAktivitetType.frilanser,
                      perioder: {
                          samletPeriode: frilanserArbeidstidInfo.samletPeriode,
                          allePerioder: frilanserArbeidstidInfo.allePerioder,
                      },
                  }
                : undefined,
        selvstendingNæringsdrivende:
            selvstendigNæringsdrivendeArbeidstidInfo !== undefined
                ? {
                      type: ArbeidAktivitetType.selvstendigNæringsdrivende,
                      perioder: {
                          samletPeriode: selvstendigNæringsdrivendeArbeidstidInfo.samletPeriode,
                          allePerioder: selvstendigNæringsdrivendeArbeidstidInfo.allePerioder,
                      },
                  }
                : undefined,
    };
};

export const getSakFromK9Sak = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): Sak | undefined => {
    return {
        barn: k9Sak.barn,
        arbeidAktivitet: getArbeidAktiviteter(k9Sak, arbeidsgivere),
    };
};
