import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidApiData } from '../../types/SøknadApiData';
import { ArbeidSøknadsdata } from '../../types/Søknadsdata';

export const getArbeidApiDataFromSøknadsdata = ({ startdato }: ArbeidSøknadsdata): ArbeidApiData => {
    return {
        startdato: startdato ? dateToISODate(startdato) : undefined,
    };
};
