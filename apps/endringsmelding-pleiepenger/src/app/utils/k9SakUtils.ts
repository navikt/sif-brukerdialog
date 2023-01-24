import { DateRange, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { Arbeidsgiver } from '../types/Arbeidsgiver';
import { ArbeidstakerMap, K9Sak } from '../types/K9Sak';

export const erArbeidsgivereIK9SakOgIAAreg = (
    arbeidsgivere: Arbeidsgiver[],
    arbeidsgivereMap?: ArbeidstakerMap
): boolean =>
    arbeidsgivereMap !== undefined
        ? Object.keys(arbeidsgivereMap).some((orgnr) => arbeidsgivere.some((a) => a.id === orgnr) === false) === false
        : false;

export const getArbeidsgivereIK9Sak = (arbeidsgivere: Arbeidsgiver[], sak: K9Sak): Arbeidsgiver[] => {
    const { arbeidstakerMap } = sak.ytelse.arbeidstidInfo;
    if (arbeidstakerMap === undefined) {
        return [];
    }
    return arbeidsgivere.filter((a) => {
        return arbeidstakerMap[a.id] !== undefined;
    });
};

export const getDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};
