import { OmAnnenForelderSøknadsdata } from '../../../types/søknadsdata/OmAnnenForelderSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmAnnenForelderFormValues } from './OmAnnenForelderStep';

export const getOmAnnenForelderStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmAnnenForelderFormValues
): OmAnnenForelderFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmAnnenForelderFormValues = {
        annenForelderNavn: '',
        annenForelderFnr: '',
    };

    const { omAnnenForelderData } = søknadsdata;
    if (omAnnenForelderData) {
        switch (omAnnenForelderData.type) {
            case 'omAnnenForelder':
                return {
                    annenForelderNavn: omAnnenForelderData.annenForelderNavn,
                    annenForelderFnr: omAnnenForelderData.annenForelderFnr,
                };
        }
    }
    return defaultValues;
};

export const getOmAnnenForelderSøknadsdataFromFormValues = (
    values: OmAnnenForelderFormValues
): OmAnnenForelderSøknadsdata | undefined => {
    const { annenForelderNavn, annenForelderFnr } = values;
    return {
        type: 'omAnnenForelder',
        annenForelderNavn,
        annenForelderFnr,
    };
};
