import { OpplæringSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OpplæringFormValues } from './OpplæringStep';

export const getOpplæringStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OpplæringFormValues
): OpplæringFormValues => {
    if (formValues) {
        return formValues;
    }
    const { beskrivelse } = søknadsdata.opplæring || {};
    return {
        beskrivelse: beskrivelse || '',
    };
};

export const getOpplæringSøknadsdataFromFormValues = (values: OpplæringFormValues): OpplæringSøknadsdata => {
    return {
        beskrivelse: values.beskrivelse || '',
    };
};
