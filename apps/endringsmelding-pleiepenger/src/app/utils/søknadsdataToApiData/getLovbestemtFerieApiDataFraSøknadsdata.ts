import { DateRange, dateRangeToISODateRange, ISODateRangeMap } from '@navikt/sif-common-utils/lib';
import { LovbestemtFerieType } from '../../types/LovbestemtFerieType';
import { LovbestemtFerieApiData } from '../../types/søknadApiData/SøknadApiData';
import { getLovbestemtFerieEndringer } from '../lovbestemtFerieUtils';

export const getLovbestemtFerieApiDataFromSøknadsdata = (
    perioderIMelding: DateRange[],
    perioderISak: DateRange[]
): LovbestemtFerieApiData => {
    const { perioderFjernet, perioderLagtTil } = getLovbestemtFerieEndringer(perioderIMelding, perioderISak);

    const perioder: ISODateRangeMap<LovbestemtFerieType> = {};
    perioderLagtTil.forEach((periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: true }));
    perioderFjernet.forEach((periode) => (perioder[dateRangeToISODateRange(periode)] = { skalHaFerie: false }));

    return {
        perioder,
    };
};
