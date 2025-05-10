import { Button, HStack, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { Settings } from '@navikt/ds-icons';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { deltakelserMockStorage } from '../../mock/msw/handlers/deltakelseMockStorage';
import { getAppEnv } from '../utils/appEnv';
import { getScenarioFromLocalStorage, saveScenarioToLocalStorage, Scenario, scenarioer } from './scenarioer';

const DevFooter = () => {
    const [showModal, setShowModal] = useState(false);
    const [scenario, setScenario] = useState<Scenario>(getScenarioFromLocalStorage());

    if (getAppEnv()['VELG_SCENARIO'] !== 'on') {
        return null;
    }

    const setScenarioFromValue = (value: string) => {
        const scenarioFromValue = scenarioer.find((s) => s.value === value);
        if (scenarioFromValue) {
            setScenario(scenarioFromValue);
        }
    };

    useEffectOnce(() => {
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.ctrlKey && e.code === 'KeyB') {
                setShowModal(!showModal);
            }
        });
    });
    return (
        <>
            <div className="settingsWrapper" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
                <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    icon={<Settings role="presentation" aria-hidden={true} />}>
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
                                value={scenario.value}
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
                                    saveScenarioToLocalStorage(scenario);
                                    deltakelserMockStorage.reset();
                                    window.location.reload();
                                }}>
                                Velg
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    deltakelserMockStorage.reset();
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
