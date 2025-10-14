import { PersonCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { getRequiredEnv } from '@navikt/sif-common-env';
import { useNavigate } from 'react-router-dom';

import { scenarioer } from '../../mock/scenarios/scenarioer';
import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const VeilederScenarioHeader = () => {
    const navigate = useNavigate();
    const setScenario = (type: ScenarioType) => {
        const scenario = scenarioer[type];
        if (scenario) {
            store.setScenario(type);
            navigate(getRequiredEnv('PUBLIC_PATH'));
            window.location.reload();
        }
    };

    return (
        <InternalHeader>
            <InternalHeader.Title>Demo av deltakersider - ungdomsprogramytelsen</InternalHeader.Title>
            <Spacer />
            <ActionMenu>
                <ActionMenu.Trigger>
                    <InternalHeader.Button>
                        <PersonCircleIcon fontSize="1.5rem" title="Informasjonikon" />
                        Velg deltakerscenario
                    </InternalHeader.Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Ny deltaker/søknad sendt">
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.søknad)}>
                            Søknadsskjema
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.søknadSendt)}>
                            Søknad sendt
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                    <ActionMenu.Divider />
                    <ActionMenu.Group label="Oppgaver for registrert deltaker">
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.endretStartdato)}>
                            Endret startdato
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.meldtUt)}>Meldt ut</ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.endretSluttdato)}>
                            Endret sluttdato
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.rapporterInntekt)}>
                            Månedlig melde fra om lønn
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.avvikInntekt)}>
                            Sjekke lønn ved avvik fra register
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                    <ActionMenu.Divider />
                    <ActionMenu.Group label="Før og etter deltakelse">
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.ikkeStartet)}>
                            Deltakelse ikke påbegynt
                        </ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => setScenario(ScenarioType.avsluttet)}>
                            Deltakelse avsluttet
                        </ActionMenu.Item>
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </InternalHeader>
    );
};

export default VeilederScenarioHeader;
