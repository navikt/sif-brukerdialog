import { Button, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useSøknadContext } from '@hooks';
import { Settings } from '@navikt/ds-icons';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { getScenarioFromLocalStorage, saveScenarioToLocalStorage, Scenario, scenarioer } from './scenarioer';
import './devFooter.scss';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [scenario, setScenario] = useState<Scenario>(getScenarioFromLocalStorage());
    const { slettMellomlagring } = useMellomlagring();
    const { dispatch } = useSøknadContext();

    const setScenarioFromValue = (value: string) => {
        const scenario = scenarioer.find((s) => s.value === value);
        if (scenario) {
            setScenario(scenario);
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
                    <FormBlock>
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
                    </FormBlock>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DevFooter;
