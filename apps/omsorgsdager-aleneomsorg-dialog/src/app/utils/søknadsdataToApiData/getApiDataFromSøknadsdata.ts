import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getBarnApiDataFromSøknadsdata } from './getBarnApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[]
): SøknadApiData | undefined => {
    const { id, omOmsorgenForBarnData, tidspunktForAleneomsorgData } = søknadsdata;
    if (!omOmsorgenForBarnData || !tidspunktForAleneomsorgData) {
        return undefined;
    }
    const barn = getBarnApiDataFromSøknadsdata(søknadsdata, registrertBarn);

    if (barn === undefined) {
        return undefined;
    }
    return {
        id,
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        barn,
        harBekreftetOpplysninger: søknadsdata.harForståttRettigheterOgPlikter === true,
    };
};
