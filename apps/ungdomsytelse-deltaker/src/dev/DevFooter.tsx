import { Settings } from '@navikt/ds-icons';
import { Button, HStack, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useState } from 'react';

import { defaultScenario, Scenario, scenarioer } from '../../mock/scenarios/scenarioer';
import { store } from '../../mock/state/store';
import { getAppEnv } from '../utils/appEnv';

const DevFooter = () => {
    const [showModal, setShowModal] = useState(false);
    const initialScenario = scenarioer[store.getScenario() || defaultScenario];

    const [scenario, setScenario] = useState<Scenario>(initialScenario);

    useEffectOnce(() => {
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.ctrlKey && e.code === 'KeyB') {
                setShowModal(!showModal);
            }
        });
    });

    if (getAppEnv()['VELG_SCENARIO'] !== 'on' || __IS_VEILEDER_DEMO__) {
        return null;
    }

    const setScenarioFromValue = (value: string) => {
        const scenarioFromValue = scenarioer[value];
        if (scenarioFromValue) {
            setScenario(scenarioFromValue);
        }
    };

    return (
        <>
            <div className="settingsWrapper" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
                <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    className="bg-white"
                    icon={<Settings aria-hidden={true} />}>
                    {scenario.name}
                </Button>
            </div>
            <Modal
                open={showModal}
                portal={true}
                onClose={() => setShowModal(false)}
                header={{
                    heading: 'Scenario',
                }}
                style={{ width: '100%' }}>
                <Modal.Body style={{ minWidth: '30rem' }}>
                    <VStack gap="4">
                        <div className="scenarioes">
                            <RadioGroup
                                value={scenario.type}
                                legend="Velg scenario"
                                onChange={(value) => setScenarioFromValue(value)}>
                                {Object.keys(scenarioer).map((key) => {
                                    const { type, name } = scenarioer[key];
                                    return (
                                        <Radio key={type} value={type}>
                                            {name}
                                        </Radio>
                                    );
                                })}
                            </RadioGroup>
                        </div>
                        <HStack gap="4">
                            <Button
                                type="button"
                                onClick={() => {
                                    store.setScenario(scenario.type);
                                    globalThis.location.reload();
                                }}>
                                Velg
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    store.setScenario(scenario.type);
                                    globalThis.location.reload();
                                }}>
                                Reset scenario
                            </Button>
                        </HStack>
                    </VStack>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DevFooter;
