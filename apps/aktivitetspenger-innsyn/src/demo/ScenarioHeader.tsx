import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const groups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Oppgaver',
        options: [
            {
                value: ScenarioType.rapporterInntekt,
                label: 'Rapportere inntekt månedlig',
            },
            {
                value: ScenarioType.rapporterInntektDelerAvMåned,
                label: 'Rapportere inntekt månedlig (deler av måned)',
            },
            {
                value: ScenarioType.avvikInntekt,
                label: 'Inntektskontroll - sjekke avvik i inntekt',
            },
            {
                value: ScenarioType.avvikInntektDelerAvMåned,
                label: 'Inntektskontroll - sjekke avvik i inntekt (deler av måned)',
            },
        ],
    },
];

const ScenarioHeader = () => {
    if (import.meta.env.PROD) {
        return null;
    }

    const setScenario = (type: ScenarioType) => {
        store.setScenario(type);
        globalThis.location.assign(getRequiredEnv('PUBLIC_PATH'));
    };

    return (
        <ScenarioSelectorHeader
            title='Demo av "Dine aktivitetspenger"'
            groups={groups}
            activeScenario={store.getScenario()}
            onSelectScenario={setScenario}
        />
    );
};

export default ScenarioHeader;
