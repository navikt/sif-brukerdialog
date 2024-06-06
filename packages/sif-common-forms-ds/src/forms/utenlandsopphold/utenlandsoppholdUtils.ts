import { dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
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
    excludeInnlagtQuestion: boolean,
    id: string | undefined,
): Partial<Utenlandsopphold> => {
    const baseValues: Partial<Utenlandsopphold> = {
        id: id || guid(),
        fom: ISOStringToDate(formValues.fom),
        tom: ISOStringToDate(formValues.tom),
        landkode: formValues.landkode,
    };

    if (excludeInnlagtQuestion) {
        return baseValues;
    }

    const { barnInnlagtPerioder, erBarnetInnlagt, erSammenMedBarnet } = formValues;
    if (formValues.erBarnetInnlagt === YesOrNo.YES) {
        return {
            ...baseValues,
            erBarnetInnlagt,
            barnInnlagtPerioder,
        };
    }
    return {
        ...baseValues,
        erBarnetInnlagt,
        erSammenMedBarnet,
    };
};

const mapUtenlandsoppholdToFormValues = (
    { fom, tom, erBarnetInnlagt, barnInnlagtPerioder, landkode, årsak, erSammenMedBarnet }: Partial<Utenlandsopphold>,
    excludeInnlagtQuestion: boolean,
): UtenlandsoppholdFormValues => ({
    fom: dateToISOString(fom),
    tom: dateToISOString(tom),
    landkode,
    erBarnetInnlagt: excludeInnlagtQuestion ? undefined : erBarnetInnlagt,
    årsak,
    barnInnlagtPerioder,
    erSammenMedBarnet,
});

const utenlandsoppholdUtils = {
    isValidUtenlandsopphold,
    mapFormValuesToUtenlandsopphold,
    mapUtenlandsoppholdToFormValues,
};
export default utenlandsoppholdUtils;
