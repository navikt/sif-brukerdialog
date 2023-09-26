import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import { guid } from '@navikt/sif-common-utils';
import { Utenlandsopphold, UtenlandsoppholdFormValues } from './types';

const isValidUtenlandsopphold = (utenlandsopphold: Partial<Utenlandsopphold>): utenlandsopphold is Utenlandsopphold => {
    return (
        utenlandsopphold.fom !== undefined &&
        utenlandsopphold.tom !== undefined &&
        utenlandsopphold.landkode !== undefined
    );
};

const mapFormValuesToUtenlandsopphold = (
    formValues: UtenlandsoppholdFormValues,
    id: string | undefined,
): Partial<Utenlandsopphold> => {
    const { barnInnlagtPerioder } = formValues;
    return {
        ...formValues,
        id: id || guid(),
        fom: ISOStringToDate(formValues.fom),
        tom: ISOStringToDate(formValues.tom),
        barnInnlagtPerioder,
    };
};

const mapUtenlandsoppholdToFormValues = ({
    fom,
    tom,
    erBarnetInnlagt,
    barnInnlagtPerioder,
    landkode,
    årsak,
}: Partial<Utenlandsopphold>): UtenlandsoppholdFormValues => ({
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
    erBarnetInnlagt,
    landkode,
    årsak,
    barnInnlagtPerioder,
});

const utenlandsoppholdUtils = {
    isValidUtenlandsopphold,
    mapFormValuesToUtenlandsopphold,
    mapUtenlandsoppholdToFormValues,
};
export default utenlandsoppholdUtils;
