import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getApiDataAnnenForelderFromSøknadsdata } from './getApiDataAnnenForelderFromSøknadsdata';
import { getOmBarnaApiDataFromSøknadsdata } from './getOmBarnaApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[]
): SøknadApiData | undefined => {
    const { omAnnenForelderData, annenForelderenSituasjonData, omBarnaData } = søknadsdata;
    if (!omAnnenForelderData || !annenForelderenSituasjonData || !omBarnaData) {
        return undefined;
    }

    return {
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        ...getApiDataAnnenForelderFromSøknadsdata(omAnnenForelderData, annenForelderenSituasjonData),
        ...getOmBarnaApiDataFromSøknadsdata(omBarnaData, registrertBarn),
        harBekreftetOpplysninger: søknadsdata.harForståttRettigheterOgPlikter === true,
    };
};
