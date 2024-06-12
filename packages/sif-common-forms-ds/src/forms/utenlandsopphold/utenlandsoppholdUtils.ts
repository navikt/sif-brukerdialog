import { getYesOrNoFromBoolean } from '@navikt/sif-common-core-ds/src/utils/yesOrNoUtils';
import { countryIsMemberOfEøsOrEfta, dateToISOString, ISOStringToDate, YesOrNo } from '@navikt/sif-common-formik-ds';
import { hasValue } from '@navikt/sif-common-formik-ds/src/validation/validationUtils';
import { guid } from '@navikt/sif-common-utils';
import { Utenlandsopphold, UtenlandsoppholdEnkel, UtenlandsoppholdFormValues, UtenlandsoppholdVariant } from './types';

export const mapFormValuesToUtenlandsopphold = (
    formValues: UtenlandsoppholdFormValues,
    variant: UtenlandsoppholdVariant,
    oppholdId: string | undefined,
): Utenlandsopphold => {
    const id = oppholdId || guid();
    const fom = ISOStringToDate(formValues.fom);
    const tom = ISOStringToDate(formValues.tom);
    const { landkode } = formValues;

    if (!fom || !tom || !landkode) {
        throw 'Invalid utenlandsopphold';
    }

    if (variant === UtenlandsoppholdVariant.ENKEL) {
        const opphold: UtenlandsoppholdEnkel = {
            type: 'enkel',
            id,
            fom,
            tom,
            landkode,
        };
        return opphold;
    }

    const isEøsOrEftaLand: boolean = countryIsMemberOfEøsOrEfta(landkode);
    const erSammenMedBarnet = formValues.erSammenMedBarnet === YesOrNo.YES;

    if (isEøsOrEftaLand) {
        return {
            type: 'innenfor_eøs',
            id,
            fom,
            tom,
            landkode,
            erSammenMedBarnet,
        };
    }

    if (isEøsOrEftaLand === false && erSammenMedBarnet === false) {
        return {
            type: 'utenfor_eøs',
            id,
            fom,
            tom,
            landkode,
            erSammenMedBarnet,
        };
    }

    const erBarnetInnlagt = formValues.erBarnetInnlagt === YesOrNo.YES ? true : false;
    return {
        type: 'utenfor_eøs',
        id,
        fom,
        tom,
        landkode,
        erSammenMedBarnet,
        erBarnetInnlagt,
        barnInnlagtPerioder: erBarnetInnlagt ? formValues.barnInnlagtPerioder : undefined,
        årsak: erBarnetInnlagt ? formValues.årsak : undefined,
    };
};

export const mapUtenlandsoppholdToFormValues = (
    utenlandsopphold: Utenlandsopphold,
    variant: UtenlandsoppholdVariant,
): UtenlandsoppholdFormValues => {
    const values: UtenlandsoppholdFormValues = {
        fom: dateToISOString(utenlandsopphold.fom),
        tom: dateToISOString(utenlandsopphold.tom),
        landkode: utenlandsopphold.landkode,
    };

    if (variant === UtenlandsoppholdVariant.ENKEL || utenlandsopphold.type === 'enkel') {
        return values;
    }

    const erSammenMedBarnet = getYesOrNoFromBoolean(utenlandsopphold.erSammenMedBarnet);
    switch (utenlandsopphold.type) {
        case 'innenfor_eøs':
            return {
                ...values,
                erSammenMedBarnet,
            };
        case 'utenfor_eøs':
            return {
                ...values,
                erSammenMedBarnet,
                erBarnetInnlagt: getYesOrNoFromBoolean(utenlandsopphold.erBarnetInnlagt),
                årsak: utenlandsopphold.årsak,
                barnInnlagtPerioder: utenlandsopphold.barnInnlagtPerioder,
            };
        default:
            return values;
    }
};

export const getUtenlandsoppholdQuestionVisibility = (
    formValues: UtenlandsoppholdFormValues,
    variant: UtenlandsoppholdVariant,
): {
    showInnlagtPerioderQuestion: boolean;
    showInnlagtQuestion: boolean;
    showÅrsakQuestion: boolean;
} => {
    const { erBarnetInnlagt, landkode, erSammenMedBarnet, fom, tom } = formValues;

    if (variant === UtenlandsoppholdVariant.ENKEL) {
        return {
            showInnlagtPerioderQuestion: false,
            showInnlagtQuestion: false,
            showÅrsakQuestion: false,
        };
    }
    const hasFomTomValues = hasValue(fom) && hasValue(tom);

    const showInnlagtQuestion: boolean =
        erSammenMedBarnet === YesOrNo.YES &&
        landkode !== undefined &&
        hasValue(landkode) &&
        !countryIsMemberOfEøsOrEfta(landkode);

    const showInnlagtPerioderQuestion =
        hasFomTomValues &&
        landkode !== undefined &&
        erBarnetInnlagt === YesOrNo.YES &&
        countryIsMemberOfEøsOrEfta(landkode) === false;

    const showÅrsakQuestion = showInnlagtPerioderQuestion;

    return {
        showInnlagtPerioderQuestion,
        showInnlagtQuestion,
        showÅrsakQuestion,
    };
};
