import { OmsorgsdagerAleneomsorgApp } from '@sif/app-register';
import { getRequiredEnv } from '@sif/env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Søkersituasjon',
        options: [
            {
                value: ScenarioType.default,
                label: 'Med registrert barn',
            },
            {
                value: ScenarioType.ingenRegistrerteBarn,
                label: 'Uten registrerte barn',
            },
        ],
    },
];

export const ScenarioHeader = () => {
    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(`${getRequiredEnv('PUBLIC_PATH')}/`);
    };

    return (
        <ScenarioSelectorHeader
            appTitle={OmsorgsdagerAleneomsorgApp.tittel.nb}
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
