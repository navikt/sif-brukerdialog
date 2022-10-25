import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { BarnApiData } from '../../types/SøknadApiData';
import { BarnSøknadsdata } from '../../types/Søknadsdata';

export const getBarnApiDataFromSøknadsdata = ({ etternavn, fornavn, fødselsdato }: BarnSøknadsdata): BarnApiData => {
    return {
        fornavn,
        etternavn,
        fødselsdato: dateToISODate(fødselsdato),
    };
};
