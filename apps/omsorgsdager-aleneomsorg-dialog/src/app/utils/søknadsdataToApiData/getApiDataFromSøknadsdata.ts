import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getBarnApiDataFromSøknadsdata } from './getBarnApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (
    søkerNorskIdent: string,
    søknadsdata: Søknadsdata,
    registrertBarn: RegistrertBarn[],
): SøknadApiData | undefined => {
    const { id, omOmsorgenForBarn, tidspunktForAleneomsorg } = søknadsdata;
    if (!omOmsorgenForBarn || !tidspunktForAleneomsorg) {
        return undefined;
    }
    const barn = getBarnApiDataFromSøknadsdata(søknadsdata, registrertBarn);

    if (barn === undefined) {
        return undefined;
    }
    return {
        søkerNorskIdent,
        id,
        språk: 'nb',
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        barn,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
    };
};
