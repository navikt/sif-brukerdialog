import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';

import { ScenarioType } from '../../../mock/scenarios/types';
import { store } from '../../../mock/state/store';
import { scenarioer } from '../../dev/scenarioer';

const VeilederDemoHeader = () => {
    // const initialScenario = scenarioer.find((s) => s.value === store.getScenario()) || scenarioer[0];

    // const [_, setScenarioType] = useState<Scenario>(initialScenario);

    const setScenario = (type: ScenarioType) => {
        const scenario = scenarioer.find((s) => s.value === type);
        if (scenario) {
            store.setScenario(scenario.value);
            window.location.reload();
            // setScenarioType(scenario);
        }
    };

    return (
        <InternalHeader>
            <InternalHeader.Title>Demo av deltakersider - ungdomsprogramytelsen</InternalHeader.Title>
            <Spacer />
            <ActionMenu>
                <ActionMenu.Trigger>
                    <InternalHeader.Button>Velg scenario</InternalHeader.Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Item onSelect={() => setScenario(ScenarioType.harIkkeSøkt)}>
                        Søknadsskjema
                    </ActionMenu.Item>
                    <ActionMenu.Item onSelect={() => setScenario(ScenarioType.harSøkt)}>
                        Registrert deltaker
                    </ActionMenu.Item>
                </ActionMenu.Content>
            </ActionMenu>
        </InternalHeader>
    );
};

export default VeilederDemoHeader;
