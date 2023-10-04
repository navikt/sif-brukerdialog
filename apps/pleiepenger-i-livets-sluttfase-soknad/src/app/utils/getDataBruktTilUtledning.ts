import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { DataBruktTilUtledning } from '../types/DataBruktTilUtledning';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledning => {
    return {
        dagerMedPleie: (søknadsdata.tidsrom?.dagerMedPleie || []).map(dateToISODate),
    };
};
