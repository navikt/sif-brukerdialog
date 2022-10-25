import { Søknadsdata } from '../../../types/Søknadsdata';
import { OpplæringFormValues } from './OpplæringSteg';

export const getOpplæringStegInitialValues = (søknadsdata: Søknadsdata): OpplæringFormValues => {
    const { beskrivelse } = søknadsdata.opplæring || {};
    return {
        beskrivelse: beskrivelse || '',
    };
};
