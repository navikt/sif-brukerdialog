import { dateRangeToISODateRange, ISODateRangeMap } from '@navikt/sif-common-utils/lib';
import { LovbestemtFerieType } from '../../types/LovbestemtFerieType';
import { LovbestemtFerieApiData } from '../../types/søknadApiData/SøknadApiData';
import { LovbestemtFerieSøknadsdata } from '../../types/søknadsdata/LovbestemtFerieSøknadsdata';

export const getLovbestemtFerieApiDataFromSøknadsdata = ({
    feriedagerMeta: { perioderFjernet, perioderLagtTil },
}: LovbestemtFerieSøknadsdata): LovbestemtFerieApiData => {
    const perioder: ISODateRangeMap<LovbestemtFerieType> = {};
    perioderLagtTil.forEach((periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: true }));
    perioderFjernet.forEach((periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: false }));
    return {
        perioder,
    };
};
