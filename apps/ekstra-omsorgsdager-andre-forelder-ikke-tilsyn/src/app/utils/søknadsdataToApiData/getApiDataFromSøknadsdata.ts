import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { omAnnenForelderData, annenForelderenSituasjonData, deresFellesBarnData } = søknadsdata;
    if (!omAnnenForelderData || !annenForelderenSituasjonData || !deresFellesBarnData) {
        return undefined;
    }

    return {
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: søknadsdata.harForståttRettigheterOgPlikter === true,
        ...getOmBarnetApiDataFromSøknadsdata(omBarnet),
    };
};
