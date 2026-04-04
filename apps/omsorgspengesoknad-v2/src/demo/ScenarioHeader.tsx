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
    if (import.meta.env.PROD) {
        return null;
    }

    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(getRequiredEnv('PUBLIC_PATH'));
        globalThis.location.reload();
    };

    return (
        <ScenarioSelectorHeader
            title="Demo av omsorgspengesøknad"
            groups={scenarioGroups}
            onSelectScenario={setScenario}
        />
    );
};
