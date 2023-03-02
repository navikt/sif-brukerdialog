import { DateRange } from 'react-day-picker';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { K9Sak, K9SakArbeidstaker } from '../types/K9Sak';
import { Sak } from '../types/Sak';
import { getAktiviteterSomKanEndres } from './arbeidAktivitetUtils';
import { maskString } from './maskString';

const maskK9Arbeidstaker = (k9Arbeidstaker: K9SakArbeidstaker) => {
    return {
        id: maskString(k9Arbeidstaker.organisasjonsnummer),
        arbeidstidInfo: k9Arbeidstaker.arbeidstidInfo,
    };
};

export const maskK9Sak = (sak: K9Sak) => {
    const { ytelse } = sak;
    const { søknadsperioder, arbeidstid } = ytelse;
    const { arbeidstakerList } = arbeidstid;

    return {
        ytelse: {
            søknadsperioder,
            arbeidstid: {
                arbeidstakerList: arbeidstakerList?.map(maskK9Arbeidstaker),
                selvstendigNæringsdrivendeArbeidstidInfo: sak.ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo
                    ? sak.ytelse.arbeidstid.selvstendigNæringsdrivendeArbeidstidInfo.perioder
                    : undefined,
                frilanserArbeidstidInfo: sak.ytelse.arbeidstid.frilanserArbeidstidInfo
                    ? sak.ytelse.arbeidstid.frilanserArbeidstidInfo.perioder
                    : undefined,
            },
        },
    };
};

const maskSak = (sak: Sak) => {
    return {
        arbeidsaktiviteter: getAktiviteterSomKanEndres(sak.arbeidAktiviteter).map((aktivitet) => ({
            id: maskString(aktivitet.id),
            perioderMedArbeidstid: aktivitet.perioderMedArbeidstid.map((periode) => ({
                periode: periode.periode,
            })),
        })),
    };
};

const maskArbeidsgivere = (arbeidsgivere: Arbeidsgiver[]) => {
    return arbeidsgivere.map((a) => ({
        ansattFom: a.ansattFom,
        ansattTom: a.ansattTom,
        a: maskString(a.organisasjonsnummer),
    }));
};

export const getSakOgArbeidsgivereDebugInfo = (
    k9sak: K9Sak,
    sak: Sak,
    arbeidsgivere: Arbeidsgiver[],
    endringsperiode: DateRange
) => {
    return {
        k9sak: maskK9Sak(k9sak),
        sak: maskSak(sak),
        arbeidsgivere: maskArbeidsgivere(arbeidsgivere),
        endringsperiode,
    };
};
