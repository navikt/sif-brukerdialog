import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { OmOmsorgenForBarnSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmOmsorgenForBarnFormValues } from './OmOmsorgenForBarnStep';

export const getOmOmsorgenForBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmOmsorgenForBarnFormValues
): OmOmsorgenForBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmOmsorgenForBarnFormValues = {
        annetBarn: [],
        harAleneomsorgFor: [],
        avtaleOmDeltBosted: YesOrNo.UNANSWERED,
        harAvtaleOmDeltBostedFor: undefined,
    };

    const { omOmsorgenForBarn } = søknadsdata || {};
    const { type, ...data } = omOmsorgenForBarn || {};

    switch (type) {
        case 'omOmsorgenForBarnUtenDeltBosted':
            return { ...defaultValues, ...data };
        case 'omOmsorgenForBarnMedDeltBosted':
            return { ...defaultValues, ...data };
        default:
            return defaultValues;
    }
};

export const getOmOmsorgenForBarnSøknadsdataFromFormValues = (
    values: OmOmsorgenForBarnFormValues,
    registrertBarn: RegistrertBarn[]
): OmOmsorgenForBarnSøknadsdata | undefined => {
    const { annetBarn = [], harAleneomsorgFor = [], avtaleOmDeltBosted, harAvtaleOmDeltBostedFor } = values;

    const isInvalid = (registrertBarn && registrertBarn.length + annetBarn.length < 1) || harAleneomsorgFor.length < 1;

    if (isInvalid) {
        return undefined;
    }

    if (avtaleOmDeltBosted === YesOrNo.NO) {
        return {
            type: 'omOmsorgenForBarnUtenDeltBosted',
            annetBarn,
            harAleneomsorgFor,
            avtaleOmDeltBosted: YesOrNo.NO,
        };
    }

    if (avtaleOmDeltBosted === YesOrNo.YES && (!harAvtaleOmDeltBostedFor || harAvtaleOmDeltBostedFor.length < 1)) {
        return undefined;
    }

    if (avtaleOmDeltBosted === YesOrNo.YES && harAvtaleOmDeltBostedFor) {
        return {
            type: 'omOmsorgenForBarnMedDeltBosted',
            annetBarn,
            harAleneomsorgFor,
            avtaleOmDeltBosted: YesOrNo.YES,
            harAvtaleOmDeltBostedFor,
        };
    }
    return undefined;
};
