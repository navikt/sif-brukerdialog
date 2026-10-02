import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Søkersituasjon',
        options: [
            {
                value: ScenarioType.default,
                label: 'Har registrert barn',
            },
            {
                value: ScenarioType.ingenRegistrerteBarn,
                label: 'Ingen registrerte barn',
            },
        ],
    },
];

export const ScenarioHeader = () => {
    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(getRequiredEnv('PUBLIC_PATH'));
    };

    return (
        <ScenarioSelectorHeader
            appTitle="Søknad"
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
