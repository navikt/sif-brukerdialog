import { BeredskapSøknadsdata } from '../../types/søknadsdata/_BeredskapSøknadsdata';
import { SøknadApiData } from '../../types/søknad-api-data/_SøknadApiData';

type BeredskapApiData = Pick<SøknadApiData, 'beredskap'>;

export const getBeredskapApiDataFromSøknadsdata = (beredskap?: BeredskapSøknadsdata): BeredskapApiData | undefined => {
    switch (beredskap?.type) {
        case 'harBeredskap':
            return {
                beredskap: {
                    beredskap: beredskap.harBeredskap,
                    tilleggsinformasjon: beredskap.harBeredskap_ekstrainfo,
                },
            };
        case 'harIkkeBeredskap':
            return {
                beredskap: {
                    beredskap: beredskap.harBeredskap,
                },
            };
        default:
            return undefined;
    }
};
