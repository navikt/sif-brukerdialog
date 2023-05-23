import { DateRange, getDateRangeFromDateRanges } from '@navikt/sif-common-utils';
import { K9Sak } from '@types';

export const getSamletDateRangeForK9Saker = (saker: K9Sak[]): DateRange | undefined => {
    const sakerDateRanges = saker
        .filter((sak) => sak.ytelse.søknadsperioder.length > 0)
        .map((sak) => {
            return getDateRangeFromDateRanges(sak.ytelse.søknadsperioder);
        });
    return sakerDateRanges.length === 0 ? undefined : getDateRangeFromDateRanges(sakerDateRanges);
};
