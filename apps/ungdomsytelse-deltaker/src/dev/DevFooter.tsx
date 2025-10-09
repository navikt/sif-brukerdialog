import { Settings } from '@navikt/ds-icons';
import { Button, HStack, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useState } from 'react';

import { store } from '../../mock/state/store';
import { getAppEnv } from '../utils/appEnv';
import { Scenario, scenarioer } from './scenarioer';

const DevFooter = () => {
    const [showModal, setShowModal] = useState(false);
    const initialScenario = scenarioer.find((s) => s.value === store.getScenario()) || scenarioer[0];

    const [scenarioType, setScenarioType] = useState<Scenario>(initialScenario);

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
        const scenarioFromValue = scenarioer.find((s) => s.value === value);
        if (scenarioFromValue) {
            setScenarioType(scenarioFromValue);
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
                    {scenarioType.name}
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
                                value={scenarioType.value}
                                legend="Velg secenario"
                                onChange={(value) => setScenarioFromValue(value)}>
                                {scenarioer.map(({ name, value }) => (
                                    <Radio key={value} value={value}>
                                        {name}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </div>
                        <HStack gap="4">
                            <Button
                                type="button"
                                onClick={() => {
                                    store.setScenario(scenarioType.value);
                                    window.location.reload();
                                }}>
                                Velg
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    store.setScenario(scenarioType.value);
                                    window.location.reload();
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
