import './devFooter.scss';

import { useSøknadContext } from '@hooks';
import { Settings } from '@navikt/ds-icons';
import { Button, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import React, { useState } from 'react';

import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { getScenarioFromLocalStorage, saveScenarioToLocalStorage, Scenario, scenarioer } from './scenarioer';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [scenario, setScenario] = useState<Scenario>(getScenarioFromLocalStorage());
    const { slettMellomlagring } = useMellomlagring();
    const { dispatch } = useSøknadContext();

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
                    heading: 'Velg scenario',
                }}
                className="scenario-modal"
                style={{ width: '100%' }}>
                <Modal.Body>
                    <VStack gap="8">
                        <div className="scenarioes">
                            <RadioGroup
                                value={scenario.value}
                                legend="Scenario hvor bruker har tilgang"
                                onChange={(value) => setScenarioFromValue(value)}>
                                {scenarioer
                                    .filter(({ harTilgang }) => harTilgang === true)
                                    .map(({ name, value }) => (
                                        <Radio key={value} value={value}>
                                            {name}
                                        </Radio>
                                    ))}
                            </RadioGroup>
                            <RadioGroup
                                value={scenario.value}
                                legend="Scenario hvor bruker stoppes"
                                onChange={(value) => setScenarioFromValue(value)}>
                                {scenarioer
                                    .filter(({ harTilgang }) => harTilgang === false)
                                    .map(({ name, value }) => (
                                        <Radio key={value} value={value}>
                                            {name}
                                        </Radio>
                                    ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <Button
                                type="button"
                                style={{ width: '100%' }}
                                onClick={() => {
                                    slettMellomlagring().then(() => {
                                        dispatch(actionsCreator.resetSøknad());
                                        saveScenarioToLocalStorage(scenario);
                                        relocateToWelcomePage();
                                    });
                                }}>
                                Velg
                            </Button>
                        </div>
                    </VStack>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DevFooter;
