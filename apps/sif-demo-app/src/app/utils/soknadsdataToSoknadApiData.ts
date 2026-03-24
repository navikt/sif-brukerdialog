import { Søker } from '@sif/api';

import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';

export const getSøknadApiDataFromSøknad = ({
    søker,
    søknadsdata,
    språk = 'nb',
}: {
    søknadsdata: Søknadsdata;
    søker: Søker;
    språk?: 'nb' | 'nn';
}): Omit<SøknadApiData, 'harBekreftetOpplysninger'> => {
    const { barn, harForståttRettigheterOgPlikter, bosted } = søknadsdata;

    if (!barn || !harForståttRettigheterOgPlikter || !bosted) {
        throw new Error('Manglende data i søknadsdata');
    }

    return {
        søkerNorskIdent: søker.fødselsnummer,
        språk,
        barnErRiktig: barn.stemmerInfoOmBarn === true,
        harForståttRettigheterOgPlikter,
    };
};
