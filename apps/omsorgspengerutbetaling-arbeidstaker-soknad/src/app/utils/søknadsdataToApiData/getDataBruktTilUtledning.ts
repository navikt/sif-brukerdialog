import { DataBruktTilUtledningAnnetData } from '../../types/søknadApiData/SøknadApiData';
import { FosterbarnSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getFosterbarnDataBruktTilUtledningFromSøknadsdata = (
    fosterbarn?: FosterbarnSøknadsdata,
): DataBruktTilUtledningAnnetData | undefined => {
    if (!fosterbarn) {
        // Feil situasjon
        return undefined;
    }

    switch (fosterbarn.type) {
        case 'harFosterbarn':
            return {
                harFosterbarn: true,
            };
        default:
            return {
                harFosterbarn: false,
            };
    }
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData | undefined => {
    return getFosterbarnDataBruktTilUtledningFromSøknadsdata(søknadsdata.fosterbarn);
};
