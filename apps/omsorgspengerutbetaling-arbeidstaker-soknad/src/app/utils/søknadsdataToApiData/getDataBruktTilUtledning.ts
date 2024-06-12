import { DataBruktTilUtledningAnnetData } from '../../types/søknadApiData/SøknadApiData';
import { DineBarnSøknadsdata, Søknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getDineBarnDataBruktTilUtledningFromSøknadsdata = (
    dineBarn?: DineBarnSøknadsdata,
): DataBruktTilUtledningAnnetData | undefined => {
    if (!dineBarn) {
        // Feil situasjon
        return undefined;
    }
    return {
        harDeltBosted: dineBarn.harDeltBosted,
    };
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData | undefined => {
    return getDineBarnDataBruktTilUtledningFromSøknadsdata(søknadsdata.dineBarn);
};
