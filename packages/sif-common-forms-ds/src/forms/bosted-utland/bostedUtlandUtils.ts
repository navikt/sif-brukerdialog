import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { BostedUtland, BostedUtlandFormValues } from './types';

const isValidBostedUtland = (bosted: Partial<BostedUtland>): bosted is BostedUtland => {
    const { fom, landkode, tom } = bosted;
    return fom !== undefined && landkode !== undefined && tom !== undefined;
};

const mapFormValuesToBostedUtland = (
    formValues: BostedUtlandFormValues,
    id: string | undefined,
): Partial<BostedUtland> => {
    return {
        id: id || guid(),
        fom: ISOStringToDate(formValues.fom),
        tom: ISOStringToDate(formValues.tom),
        landkode: formValues.landkode,
    };
};

const mapBostedUtlandToFormValues = ({ fom, tom, landkode }: Partial<BostedUtland>): BostedUtlandFormValues => {
    return {
        fom: dateToISOString(fom),
        tom: dateToISOString(tom),
        landkode,
    };
};

const bostedUtlandUtils = {
    isValidBostedUtland,
    mapBostedUtlandToFormValues,
    mapFormValuesToBostedUtland,
};

export default bostedUtlandUtils;
