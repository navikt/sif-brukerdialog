import { LovbestemtFerieApiData, LovbestemtFerieSøknadsdata, LovbestemtFerieType } from '@app/types';
import {
    dateRangeToISODateRange,
    ISODateRangeMap,
    joinAdjacentDateRanges,
    sortDateRange,
} from '@navikt/sif-common-utils';

export const getLovbestemtFerieApiDataFromSøknadsdata = ({
    feriedagerMeta: { perioderFjernet, perioderLagtTil },
}: LovbestemtFerieSøknadsdata): LovbestemtFerieApiData => {
    const perioder: ISODateRangeMap<LovbestemtFerieType> = {};
    joinAdjacentDateRanges(perioderLagtTil.sort(sortDateRange)).forEach(
        (periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: true }),
    );
    joinAdjacentDateRanges(perioderFjernet.sort(sortDateRange)).forEach(
        (periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: false }),
    );

    return {
        perioder,
    };
};
