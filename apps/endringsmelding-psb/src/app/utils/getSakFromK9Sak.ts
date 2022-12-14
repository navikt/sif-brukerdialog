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
        const { allePerioder, samletPeriode, arbeidsuker } = arbeidstakerMap[key];
        const arbeidsgiver = arbeidsgivere.find((arbeidsgiver) => arbeidsgiver.id === key);
        if (arbeidsgiver) {
            aktivitetArbeidstaker.push({
                id: `id_${arbeidsgiver.id}`,
                type: ArbeidAktivitetType.arbeidstaker,
                arbeidsgiver,
                perioder: {
                    allePerioder,
                    samletPeriode,
                    arbeidsuker,
                },
            });
        }
    });

    return {
        arbeidstakerArr: aktivitetArbeidstaker,
        frilanser:
            frilanserArbeidstidInfo !== undefined
                ? {
                      id: ArbeidAktivitetType.frilanser,
                      type: ArbeidAktivitetType.frilanser,
                      perioder: {
                          samletPeriode: frilanserArbeidstidInfo.samletPeriode,
                          allePerioder: frilanserArbeidstidInfo.allePerioder,
                          arbeidsuker: frilanserArbeidstidInfo.arbeidsuker,
                      },
                  }
                : undefined,
        selvstendigNæringsdrivende:
            selvstendigNæringsdrivendeArbeidstidInfo !== undefined
                ? {
                      id: ArbeidAktivitetType.selvstendigNæringsdrivende,
                      type: ArbeidAktivitetType.selvstendigNæringsdrivende,
                      perioder: {
                          samletPeriode: selvstendigNæringsdrivendeArbeidstidInfo.samletPeriode,
                          allePerioder: selvstendigNæringsdrivendeArbeidstidInfo.allePerioder,
                          arbeidsuker: selvstendigNæringsdrivendeArbeidstidInfo.arbeidsuker,
                      },
                  }
                : undefined,
    };
};

export const getSakFromK9Sak = (k9Sak: K9Sak, arbeidsgivere: Arbeidsgiver[]): Sak | undefined => {
    return {
        barn: k9Sak.barn,
        arbeidAktiviteter: getArbeidAktiviteter(k9Sak, arbeidsgivere),
        ytelse: {
            type: k9Sak.ytelse.type,
        },
    };
};
