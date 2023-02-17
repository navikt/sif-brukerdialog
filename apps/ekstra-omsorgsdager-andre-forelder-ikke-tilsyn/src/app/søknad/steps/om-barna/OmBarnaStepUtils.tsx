import { OmBarnaSøknadsdata } from '../../../types/søknadsdata/OmBarnaSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnaFormValues } from './OmBarnaStep';

export const getOmBarnaStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnaFormValues
): OmBarnaFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmBarnaFormValues = {
        andreBarn: [],
    };

    const { omBarnaData } = søknadsdata;
    if (omBarnaData) {
        switch (omBarnaData.type) {
            case 'andreBarn':
                return {
                    andreBarn: omBarnaData.andreBarn,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnaSøknadsdataFromFormValues = (values: OmBarnaFormValues): OmBarnaSøknadsdata | undefined => {
    const { andreBarn } = values;
    return {
        type: 'andreBarn',
        andreBarn,
    };
};
