import { DataBruktTilUtledning } from '../types/DataBruktTilUtledning';
import { Søknadsdata } from '../types/søknadsdata/Søknadsdata';
import { getDagerMedPleieApiData } from './søknadsdataToApiData/getApiDataFromSøknadsdata';

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledning => {
    return {
        dagerMedPleie: getDagerMedPleieApiData(søknadsdata),
    };
};
