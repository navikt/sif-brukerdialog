import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { Enkeltdato, EnkeltdatoFormValues } from './types';

const isValidEnkeltdato = (enkeltdato: Partial<Enkeltdato>): enkeltdato is Enkeltdato => {
    return enkeltdato.dato !== undefined;
};

const mapFormValuesToEnkeltdato = (formValues: EnkeltdatoFormValues, id: string | undefined): Partial<Enkeltdato> => {
    return {
        id: id || guid(),
        dato: ISOStringToDate(formValues.dato),
    };
};

const mapEnkeltdatoToFormValues = ({ dato }: Partial<Enkeltdato>): EnkeltdatoFormValues => {
    return {
        dato: dateToISOString(dato),
    };
};

const enkeltdatoUtils = {
    isValidEnkeltdato,
    mapFormValuesToEnkeltdato,
    mapEnkeltdatoToFormValues,
};

export default enkeltdatoUtils;
