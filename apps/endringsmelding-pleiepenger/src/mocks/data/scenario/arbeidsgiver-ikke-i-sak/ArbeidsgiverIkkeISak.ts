import { ScenarioData } from '../../../msw/handlers';

import arbeidsgiver from './arbeidsgiver-mock';
import sak from './sak-mock';
import søker from './søker-mock';

export const ArbeidsgiverIkkeISak: ScenarioData = {
    sak,
    arbeidsgiver,
    søker,
};
