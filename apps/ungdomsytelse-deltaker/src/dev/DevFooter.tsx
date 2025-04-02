import { Button, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Settings } from '@navikt/ds-icons';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { getScenarioFromLocalStorage, saveScenarioToLocalStorage, Scenario, scenarioer } from './scenarioer';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [scenario, setScenario] = useState<Scenario>(getScenarioFromLocalStorage());

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
                    <FormBlock>
                        <Button
                            type="button"
                            onClick={() => {
                                saveScenarioToLocalStorage(scenario);
                                window.location.reload();
                            }}>
                            Velg
                        </Button>
                    </FormBlock>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DevFooter;
