import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { Søknadsdata } from '../../../types/Søknadsdata';
import { BarnFormValues } from './BarnSteg';

export const getBarnStegInitialValues = (søknadsdata: Søknadsdata): BarnFormValues => {
    const { etternavn, fornavn, fødselsdato } = søknadsdata.barn || {};
    return {
        etternavn: etternavn || '',
        fornavn: fornavn || '',
        fødselsdato: fødselsdato ? dateToISODate(fødselsdato) : '',
    };
};
