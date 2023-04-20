import {
    dateRangeToISODateRange,
    ISODateRangeMap,
    joinAdjacentDateRanges,
    sortDateRange,
} from '@navikt/sif-common-utils';
import { LovbestemtFerieType } from '../../types/LovbestemtFerieType';
import { LovbestemtFerieApiData } from '../../types/søknadApiData/SøknadApiData';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';

export const getLovbestemtFerieApiDataFromSøknadsdata = ({
    feriedagerMeta: { perioderFjernet, perioderLagtTil },
}: LovbestemtFerieSøknadsdata): LovbestemtFerieApiData => {
    const perioder: ISODateRangeMap<LovbestemtFerieType> = {};
    joinAdjacentDateRanges(perioderLagtTil.sort(sortDateRange)).forEach(
        (periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: true })
    );
    joinAdjacentDateRanges(perioderFjernet.sort(sortDateRange)).forEach(
        (periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: false })
    );

    return {
        perioder,
    };
};
