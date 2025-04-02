import { ScenarioData } from '..';
import arbeidsgiverMock from '../../common/arbeidsgiver-mock';
import barnMock from '../../common/barn-mock';
import søkerMock from '../../common/søker-mock';
import deltakelser from './deltakelser-mock';

export const harSøktMock: ScenarioData = {
    barn: barnMock,
    søker: søkerMock,
    arbeidsgiver: arbeidsgiverMock,
    deltakelser,
};
