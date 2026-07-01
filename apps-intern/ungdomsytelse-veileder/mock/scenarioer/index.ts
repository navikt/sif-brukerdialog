import { kanEndreSluttdatoScenario } from './kanEndreSluttdato';
import { kanForlengePeriodeScenario } from './kanForlengePeriode';
import { kanIkkeForlengePeriodeScenario } from './kanIkkeForlengePeriode';
import { kanSletteDeltakelseScenario } from './kanSletteDeltakelse';
import { nyDeltakerScenario } from './nyDeltaker';
import { nyligRegistrertScenario } from './nyligRegistrert';
import { registrertDeltakerScenario } from './registrertDeltaker';
import { skjermetDeltakerScenario } from './skjermetDeltaker';
import { slettetDeltakerScenario } from './slettetDeltaker';
import { personFinnesIkkeScenario, personMedKode6Scenario } from './spesielleScenarioer';
import { MockScenario } from './types';

export const alleScenarioer: MockScenario[] = [
    // Grunnscenarioer
    nyDeltakerScenario,
    registrertDeltakerScenario,
    nyligRegistrertScenario,
    slettetDeltakerScenario,
    personFinnesIkkeScenario,

    // Handlinger (DeltakelseHandlinger)
    kanSletteDeltakelseScenario,
    kanEndreSluttdatoScenario,
    kanForlengePeriodeScenario,
    kanIkkeForlengePeriodeScenario,

    // Tilgangsbegrensning
    skjermetDeltakerScenario,
    personMedKode6Scenario,
];

export type { MockScenario };
