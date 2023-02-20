import { Button, Heading, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React, { useState } from 'react';
import { Settings } from '@navikt/ds-icons';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { useMellomlagring } from '../hooks/useMellomlagring';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import { getScenarioFromLocalStorage, saveScenarioToLocalStorage, Scenario, scenarioer } from './scenarioer';

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
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <ModalContent>
                    <Heading level="1" size="medium" style={{ paddingRight: '3rem', minWidth: '14rem' }}>
                        Velg scenario som skal brukes
                    </Heading>
                    <FormBlock>
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
                    </FormBlock>
                    <FormBlock>
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
                    </FormBlock>
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
                </ModalContent>
            </Modal>
        </>
    );
};

export default DevFooter;
