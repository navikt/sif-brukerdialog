import { TilgjengeligSøknadType } from '@navikt/ung-brukerdialog-api';
import { søkerTestBrukeresen } from '@sif/api/mock-data';

import { ScenarioData } from '../scenarios/types';

export const scenarioBaseData: ScenarioData = {
    søker: søkerTestBrukeresen,
    oppgaver: [],
    tilgangsinfo: {
        harInnsyn: true,
        harUbehandletSøknad: false,
        type: TilgjengeligSøknadType.INGEN,
    },
};
