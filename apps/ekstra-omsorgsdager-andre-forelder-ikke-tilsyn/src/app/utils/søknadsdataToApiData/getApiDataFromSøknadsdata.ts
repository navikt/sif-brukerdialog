import { RegistrertBarn } from '@navikt/sif-common-api';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getApiDataAnnenForelderFromSøknadsdata } from './getApiDataAnnenForelderFromSøknadsdata';
import { getOmBarnaApiDataFromSøknadsdata } from './getOmBarnaApiDataFromSøknadsdata';
import { Locale } from '@navikt/sif-common-core-ds/src';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[],
    locale: Locale,
): SøknadApiData | undefined => {
    const { id, omAnnenForelder, annenForelderSituasjon, omBarna } = søknadsdata;
    if (!omAnnenForelder || !annenForelderSituasjon || !omBarna) {
        return undefined;
    }

    return {
        søkerNorskIdent,
        id,
        språk: locale,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        ...getApiDataAnnenForelderFromSøknadsdata(omAnnenForelder, annenForelderSituasjon),
        ...getOmBarnaApiDataFromSøknadsdata(omBarna, registrertBarn),
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
    };
};
