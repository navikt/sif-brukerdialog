import { OmBarnetApiData } from '../../types/søknadApiData/SøknadApiData';

export const getOmBarnetApiDataFromSøknadsdata = (): OmBarnetApiData => {
    return {
        barn: {
            aktørId: '1123',
            navn: 'abc',
            norskIdentifikator: '123',
        },
    };
};
