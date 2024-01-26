import { FosterbarnFormValues } from './FosterbarnStep';
import { FosterbarnSøknadsdata } from '../../../types/søknadsdata/FosterbarnSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src/types';

export const getFosterbarnSøknadsdataFromFormValues = (
    values: FosterbarnFormValues,
): FosterbarnSøknadsdata | undefined => {
    const { fosterbarn, harFostrerbarn } = values;

    if (harFostrerbarn === YesOrNo.YES && fosterbarn && fosterbarn.length > 0) {
        return {
            type: 'harFosterbarn',
            fosterbarn,
        };
    }

    return { type: 'harIkkeFosterbarn' };
};

export const getFosterbarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: FosterbarnFormValues,
): FosterbarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const { fosterbarn } = søknadsdata;

    if (fosterbarn) {
        return fosterbarn.type === 'harFosterbarn'
            ? { fosterbarn: fosterbarn.fosterbarn, harFostrerbarn: YesOrNo.YES }
            : { fosterbarn: [], harFostrerbarn: YesOrNo.NO };
    }

    return { fosterbarn: [], harFostrerbarn: YesOrNo.UNANSWERED };
};
