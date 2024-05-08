import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { dateToday } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { StepId } from '../../../types/StepId';
import { TempFormValues } from '../../../types/SøknadContextState';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { DineBarnFormFields, DineBarnFormValues } from './DineBarnStep';
import './dineBarn.css';

export const nYearsAgo = (years: number): Date => {
    return dayjs(dateToday).subtract(years, 'y').startOf('year').toDate();
};

export const getYesOrNoFromBoolean = (value?: boolean): YesOrNo => {
    if (value == undefined) {
        return YesOrNo.UNANSWERED;
    }
    return value ? YesOrNo.YES : YesOrNo.NO;
};

export const getDineBarnSøknadsdataFromFormValues = (values: DineBarnFormValues): DineBarnSøknadsdata | undefined => {
    const { andreBarn = [] } = values;

    const harDeltBosted = values[DineBarnFormFields.harDeltBosted] === YesOrNo.YES;

    return {
        andreBarn,
        harDeltBosted,
    };
};

export const getDineBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    tempFormValues?: TempFormValues,
    formValues?: DineBarnFormValues,
): DineBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: DineBarnFormValues = {
        andreBarn: undefined,
        harDeltBosted: YesOrNo.UNANSWERED,
    };

    if (tempFormValues && tempFormValues.stepId === StepId.DINE_BARN) {
        const { values } = tempFormValues;
        return {
            andreBarn: values.andreBarn,
            harDeltBosted: values.harDeltBosted,
        };
    }

    const { dineBarn } = søknadsdata;
    if (dineBarn) {
        return {
            andreBarn: dineBarn.andreBarn,
            harDeltBosted: getYesOrNoFromBoolean(dineBarn.harDeltBosted),
        };
    }
    return defaultValues;
};
