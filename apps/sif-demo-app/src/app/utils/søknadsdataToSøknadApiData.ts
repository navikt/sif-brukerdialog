import { Søker } from '@navikt/sif-common-query';

import { SøknadApiData } from '../types/SøknadApiData';
import { Søknadsdata } from '../types/Søknadsdata';

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
