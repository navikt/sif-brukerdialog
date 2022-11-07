import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getArbeidApiDataFromSøknadsdata = ({ startdato }: ArbeidSøknadsdata): ArbeidApiData => {
    return {
        startdato: startdato ? dateToISODate(startdato) : undefined,
    };
};
