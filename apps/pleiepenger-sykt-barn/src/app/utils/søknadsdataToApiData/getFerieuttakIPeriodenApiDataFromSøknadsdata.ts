import { dateToISODate } from '@navikt/sif-common-utils';
import { FerieuttakIPeriodenApiData } from '../../types/søknad-api-data/SøknadApiData';
import { FerieuttakIPeriodenSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getFerieuttakIPeriodenApiDataFromSøknadsdata = (
    ferieuttakIPerioden?: FerieuttakIPeriodenSøknadsdata,
): FerieuttakIPeriodenApiData => {
    if (ferieuttakIPerioden === undefined) {
        throw Error('ferieuttakIPeriodenSøknadsdata undefined');
    }

    switch (ferieuttakIPerioden?.type) {
        case 'skalTaUtFerieSøknadsdata':
            const { ferieuttak } = ferieuttakIPerioden;

            if (ferieuttak.length === 0) {
                throw Error('ferieuttak er tomt');
            }
            return {
                skalTaUtFerieIPerioden: true,
                ferieuttak: ferieuttakIPerioden.ferieuttak.map((uttak) => ({
                    fraOgMed: dateToISODate(uttak.from),
                    tilOgMed: dateToISODate(uttak.to),
                })),
            };
        case 'skalIkkeTaUtFerieSøknadsdata':
            return {
                skalTaUtFerieIPerioden: false,
                ferieuttak: [],
            };
    }
};
