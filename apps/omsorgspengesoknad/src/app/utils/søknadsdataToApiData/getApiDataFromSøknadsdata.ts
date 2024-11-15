import { getVedleggApiData, Locale } from '@navikt/sif-common-core-ds';
import { includeDeltBostedStep } from '../../søknad/søknadStepConfig';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getDataBruktTilUtledning } from './getDataBruktTilUtledning';
import { getOmBarnetApiDataFromSøknadsdata } from './getOmBarnetApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata, locale: Locale): SøknadApiData | undefined => {
    const { omBarnet } = søknadsdata;
    if (!omBarnet) {
        return undefined;
    }

    const inkluderDeltBosted = includeDeltBostedStep(søknadsdata.omBarnet);

    return {
        språk: locale,
        harForståttRettigheterOgPlikter: søknadsdata.velkommen?.harForståttRettigheterOgPlikter === true,
        harBekreftetOpplysninger: søknadsdata.oppsummering?.harBekreftetOpplysninger === true,
        ...getOmBarnetApiDataFromSøknadsdata(omBarnet),
        legeerklæring: getVedleggApiData(søknadsdata.legeerklaering?.vedlegg),
        samværsavtale: inkluderDeltBosted ? getVedleggApiData(søknadsdata.deltBosted?.vedlegg) : undefined,
        dataBruktTilUtledningAnnetData: JSON.stringify(getDataBruktTilUtledning(søknadsdata)),
    };
};
