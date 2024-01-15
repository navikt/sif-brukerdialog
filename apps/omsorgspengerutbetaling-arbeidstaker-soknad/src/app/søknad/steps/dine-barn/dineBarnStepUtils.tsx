import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const getDineBarnSøknadsdataFromFormValues = (values: DineBarnFormValues): DineBarnSøknadsdata | undefined => {
    const { fosterbarn } = values;

    if (fosterbarn && fosterbarn.length > 0) {
        return {
            type: 'dineBarnHarFosterbarn',
            fosterbarn,
        };
    }

    return { type: 'dineBarnHarIkkeFosterbarn' };
};

export const getDineBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DineBarnFormValues,
): DineBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const { dineBarn } = søknadsdata;

    if (dineBarn) {
        return dineBarn.type === 'dineBarnHarFosterbarn'
            ? { fosterbarn: dineBarn.fosterbarn }
            : { fosterbarn: [], harFostrerbarn: YesOrNo.NO };
    }

    return { fosterbarn: [], harFostrerbarn: YesOrNo.UNANSWERED };
};
