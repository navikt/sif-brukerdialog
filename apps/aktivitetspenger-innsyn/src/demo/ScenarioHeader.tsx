import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';
import { useNavigate } from 'react-router-dom';

import { scenarioer } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const ScenarioHeader = () => {
    if (import.meta.env.PROD) {
        return null;
    }

    const navigate = useNavigate();
    const setScenario = (type: ScenarioType) => {
        const scenario = scenarioer[type];
        if (scenario) {
            store.setScenario(type);
            navigate(getRequiredEnv('PUBLIC_PATH'));
            globalThis.location.reload();
        }
    };

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

    return (
        <ScenarioSelectorHeader
            title='Demo av "Dine aktivitetspenger"'
            groups={groups}
            onSelectScenario={setScenario}
        />
    );
};

export default ScenarioHeader;
