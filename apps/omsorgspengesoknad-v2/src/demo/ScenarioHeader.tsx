import { OmsorgsdagerKroniskApp } from '@navikt/sif-app-register';
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
            {
                value: ScenarioType.toBarnMedVedtak,
                label: 'To barn — ett med vedtak',
            },
            {
                value: ScenarioType.barnMedTidsavgrensetVedtak,
                label: 'To barn — ett med tidsavgrenset vedtak',
            },
        ],
    },
];

export const ScenarioHeader = () => {
    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(getRequiredEnv('PUBLIC_PATH'));
        globalThis.location.reload();
    };

    return (
        <ScenarioSelectorHeader
            appTitle={OmsorgsdagerKroniskApp.tittel.nb}
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
