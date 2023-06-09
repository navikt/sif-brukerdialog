import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getApiDataAnnenForelderFromSøknadsdata } from './getApiDataAnnenForelderFromSøknadsdata';
import { getOmBarnaApiDataFromSøknadsdata } from './getOmBarnaApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[]
): SøknadApiData | undefined => {
    const { id, omAnnenForelder, annenForelderSituasjon, omBarna } = søknadsdata;
    if (!omAnnenForelder || !annenForelderSituasjon || !omBarna) {
        return undefined;
    }

    return {
        id,
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        ...getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderSituasjon),
        ...getOmBarnaApiDataFromSøknadsdata(omBarna, registrertBarn),
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
    };
};
