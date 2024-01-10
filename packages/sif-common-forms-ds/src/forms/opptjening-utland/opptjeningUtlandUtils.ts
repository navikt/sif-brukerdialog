import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds';
import { guid } from '@navikt/sif-common-utils';
import { OpptjeningUtland, OpptjeningUtlandFormValues } from './types';

const isValidOpptjeningUtland = (opptjeningUtland: Partial<OpptjeningUtland>): opptjeningUtland is OpptjeningUtland => {
    return (
        opptjeningUtland.fom !== undefined &&
        opptjeningUtland.tom !== undefined &&
        opptjeningUtland.landkode !== undefined
    );
};

const mapFormValuesToOpptjeningUtland = (
    formValues: OpptjeningUtlandFormValues,
    id: string | undefined,
): Partial<OpptjeningUtland> => {
    return {
        ...formValues,
        id: id || guid(),
        fom: ISOStringToDate(formValues.fom),
        tom: ISOStringToDate(formValues.tom),
    };
};

const mapOpptjeningUtlandToFormValues = ({
    fom,
    tom,
    landkode,
    opptjeningType: type,
    navn,
}: Partial<OpptjeningUtland>): OpptjeningUtlandFormValues => ({
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
    landkode,
    opptjeningType: type,
    navn,
});

const opptjeningUtlandUtils = {
    isValidOpptjeningUtland,
    mapFormValuesToOpptjeningUtland,
    mapOpptjeningUtlandToFormValues,
};
export default opptjeningUtlandUtils;
