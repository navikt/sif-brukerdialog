import { Button, Heading, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React, { useState } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { Settings } from '@navikt/ds-icons';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useMellomlagring } from '../hooks/useMellomlagring';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [mockUser, setMockUser] = useState(localStorage.getItem('mockUser') || 'scenario1');
    const { slettMellomlagring } = useMellomlagring();
    const { dispatch } = useSøknadContext();

    const saveMockUser = (user: string) => {
        localStorage.setItem('mockUser', user);
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
            <div className="settingsWrapper" style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
                <Button
                    type="button"
                    size="small"
                    variant="secondary"
                    onClick={() => setShowModal(true)}
                    icon={<Settings />}>
                    {mockUser}
                </Button>
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <ModalContent>
                    <Heading level="1" size="medium" style={{ paddingRight: '3rem' }}>
                        Endring av arbeidstid
                    </Heading>
                    <FormBlock>
                        <RadioGroup
                            value={mockUser}
                            legend="Velg scenario som skal testes"
                            onChange={(user) => setMockUser(user)}>
                            <Radio value="scenario1">Scenario 1</Radio>
                            <Radio value="scenario2">Scenario 2</Radio>
                        </RadioGroup>
                    </FormBlock>
                    <FormBlock>
                        <Button
                            type="button"
                            onClick={() => {
                                slettMellomlagring().then(() => {
                                    dispatch(actionsCreator.resetSøknad());
                                    saveMockUser(mockUser);
                                    relocateToWelcomePage();
                                });
                            }}>
                            Ok
                        </Button>
                    </FormBlock>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DevFooter;
