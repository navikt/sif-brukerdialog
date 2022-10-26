import { OpplæringSøknadsdata, Søknadsdata } from '../../../types/Søknadsdata';
import { OpplæringFormValues } from './OpplæringStep';

export const getOpplæringStepInitialValues = (søknadsdata: Søknadsdata): OpplæringFormValues => {
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
