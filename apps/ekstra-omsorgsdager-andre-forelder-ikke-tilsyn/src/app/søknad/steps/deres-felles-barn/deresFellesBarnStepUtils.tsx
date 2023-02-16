import { DeresFellesBarnSøknadsdata } from 'app/types/søknadsdata/DeresFellesBarnSøknadsdata';
import { Søknadsdata } from 'app/types/søknadsdata/Søknadsdata';
import { DeresFellesBarnFormValues } from './DeresFellesBarnStep';

export const getDeresFellesBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DeresFellesBarnFormValues
): DeresFellesBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: DeresFellesBarnFormValues = {
        andreBarn: [],
    };

    const { deresFellesBarnData } = søknadsdata;
    if (deresFellesBarnData) {
        switch (deresFellesBarnData.type) {
            case 'andreBarn':
                return {
                    andreBarn: deresFellesBarnData.andreBarn,
                };
        }
    }
    return defaultValues;
};

export const getOmDeresFellesBarnFromFormValues = (
    values: DeresFellesBarnFormValues
): DeresFellesBarnSøknadsdata | undefined => {
    const { andreBarn } = values;
    return {
        type: 'andreBarn',
        andreBarn,
    };
};
