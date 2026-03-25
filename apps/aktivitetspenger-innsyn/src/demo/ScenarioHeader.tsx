import { PersonCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { useNavigate } from 'react-router-dom';

import { scenarioer } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const ScenarioHeader = () => {
    const navigate = useNavigate();
    const setScenario = (type: ScenarioType) => {
        const scenario = scenarioer[type];
        if (scenario) {
            store.setScenario(type);
            navigate(getRequiredEnv('PUBLIC_PATH'));
            globalThis.location.reload();
        }
    };

    return (
        <InternalHeader>
            <InternalHeader.Title>Demo av &quot;Dine aktivitetspenger&quot;</InternalHeader.Title>
            <Spacer />
            <ActionMenu>
                <ActionMenu.Trigger>
                    <InternalHeader.Button>
                        <PersonCircleIcon fontSize="1.5rem" title="Informasjonikon" />
                        Velg scenario
                    </InternalHeader.Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Oppgaver">
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.rapporterInntekt)}>
                            Rapportere inntekt månedlig
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.rapporterInntektDelerAvMåned)}>
                            Rapportere inntekt månedlig (deler av måned)
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.avvikInntekt)}>
                            Inntektskontroll - sjekke avvik i inntekt
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.avvikInntektDelerAvMåned)}>
                            Inntektskontroll - sjekke avvik i inntekt (deler av måned)
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </InternalHeader>
    );
};

export default ScenarioHeader;
