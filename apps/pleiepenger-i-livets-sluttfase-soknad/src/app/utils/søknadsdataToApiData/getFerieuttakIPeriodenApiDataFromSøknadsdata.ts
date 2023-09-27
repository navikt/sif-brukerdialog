import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { FerieuttakIPeriodenApiData } from '../../types/søknadApiData/SøknadApiData';
import { TidsromSøknadsdata } from '../../types/søknadsdata/TidsromSøknadsdata';

export const getFerieuttakIPeriodenApiDataFromSøknadsdata = (
    tidsrom: TidsromSøknadsdata,
): FerieuttakIPeriodenApiData | undefined => {
    if (tidsrom.type === 'tidsromKunMedFerie' || tidsrom.type === 'tidsromMedUtenlandsoppholdMedFerie') {
        return {
            skalTaUtFerieIPerioden: tidsrom.skalTaUtFerieIPerioden,
            ferieuttak: tidsrom.ferieuttakIPerioden.map((uttak) => ({
                fraOgMed: dateToISODate(uttak.from),
                tilOgMed: dateToISODate(uttak.to),
            })),
        };
    }

    if (tidsrom.skalTaUtFerieIPerioden === false) {
        return {
            skalTaUtFerieIPerioden: false,
            ferieuttak: [],
        };
    }

    return undefined;
};
