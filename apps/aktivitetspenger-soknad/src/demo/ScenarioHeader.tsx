import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';
import { useAppIntl } from '@app/i18n';

export const ScenarioHeader = () => {
    const { text } = useAppIntl();
    if (import.meta.env.PROD) {
        return null;
    }

    const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
        {
            label: text('scenarioHeader.inngangsscenarioer'),
            options: [
                {
                    value: ScenarioType.kanSøkeFørstegang,
                    label: text('scenarioHeader.førstegangssøknad'),
                },
                {
                    value: ScenarioType.nyPeriodeSøknad,
                    label: text('scenarioHeader.annengangssøknad'),
                },
                {
                    value: ScenarioType.ubehandletFørstegangssøknad,
                    label: text('scenarioHeader.sperretUbehandletFørstegangssøknad'),
                },
                {
                    value: ScenarioType.kanIkkeSøke,
                    label: text('scenarioHeader.sperretUtenforSøkevindu'),
                },
            ],
        },
        {
            label: text('scenarioHeader.søkersituasjon'),
            options: [
                {
                    value: ScenarioType.default,
                    label: text('scenarioHeader.standardMedKontonummer'),
                },
                {
                    value: ScenarioType.medKontonummer,
                    label: text('scenarioHeader.medKontonummer'),
                },
                {
                    value: ScenarioType.utenKontonummer,
                    label: text('scenarioHeader.utenKontonummer'),
                },
                {
                    value: ScenarioType.ingenRegistrerteBarn,
                    label: text('scenarioHeader.ingenRegistrerteBarn'),
                },
            ],
        },
    ];

    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(`${getRequiredEnv('PUBLIC_PATH')}/`);
    };

    return (
        <ScenarioSelectorHeader
            title={text('scenarioHeader.tittel')}
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
