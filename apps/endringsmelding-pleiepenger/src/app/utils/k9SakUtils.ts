import { DateRange, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { Arbeidsgiver, K9Sak, K9SakArbeidstaker } from '@types';

export const getSamletDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};

export const finnesArbeidsgiverIK9Sak = (
    arbeidsgiver: Arbeidsgiver,
    arbeidsgivereISak: K9SakArbeidstaker[]
): boolean => {
    return arbeidsgivereISak.some(
        ({ organisasjonsnummer }) => organisasjonsnummer === arbeidsgiver.organisasjonsnummer
    );
};
