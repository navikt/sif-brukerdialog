import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Inngangsscenarioer',
        options: [
            { value: ScenarioType.kanSøkeFørstegang, label: 'Åpen for søknad' },
            {
                value: ScenarioType.ubehandletFørstegangssøknad,
                label: 'Sperret - Ubehandlet førstegangssøknad',
            },
            {
                value: ScenarioType.ubehandletAndregangssøknad,
                label: 'Sperret - Ubehandlet andregangssøknad',
            },
            {
                value: ScenarioType.harAktivitetspengerMenUtenforSøknadsvindu,
                label: 'Sperret - Har aktivitetspenger og utenfor søkevindu',
            },
            { value: ScenarioType.sperretAnnet, label: 'Sperret - Annet' },
        ],
    },
    {
        label: 'Søkersituasjon',
        options: [
            { value: ScenarioType.default, label: 'Standard (med kontonummer)' },
            { value: ScenarioType.medKontonummer, label: 'Med kontonummer' },
            { value: ScenarioType.utenKontonummer, label: 'Uten kontonummer' },
            { value: ScenarioType.ingenRegistrerteBarn, label: 'Ingen registrerte barn' },
        ],
    },
];

export const ScenarioHeader = () => {
    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        if (__IS_GITHUB_PAGES__) {
            // HashRouter: en full navigasjon til path-basert PUBLIC_PATH fungerer ikke på gh-pages.
            globalThis.location.assign(`${import.meta.env.BASE_URL}#/`);
            globalThis.location.reload();
        } else {
            globalThis.location.assign(`${getRequiredEnv('PUBLIC_PATH')}/`);
        }
    };

    return (
        <ScenarioSelectorHeader
            isGitHubPages={__IS_GITHUB_PAGES__}
            appTitle={AktivitetspengerSoknadApp.tittel.nb}
            groups={scenarioGroups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};
