import { Button, Heading, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React, { useState } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { relocateToWelcomePage } from '../utils/navigationUtils';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { Settings } from '@navikt/ds-icons';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [mockUser, setMockUser] = useState(localStorage.getItem('mockUser') || 'soker1');

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
                        Velg søkerdata som skal brukes i endringsdialogen.
                    </Heading>
                    <FormBlock>
                        <RadioGroup value={mockUser} legend="Brukerprofiler" onChange={(user) => setMockUser(user)}>
                            <Radio value="soker1">Søker 1</Radio>
                            <Radio value="soker2">Søker 2</Radio>
                            <Radio value="soker3">Søker 3</Radio>
                            <Radio value="soker4">Søker 4</Radio>
                            <Radio value="soker5">Søker 5</Radio>
                        </RadioGroup>
                    </FormBlock>
                    <FormBlock>
                        <Button
                            type="button"
                            onClick={() => {
                                saveMockUser(mockUser);
                                relocateToWelcomePage();
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
