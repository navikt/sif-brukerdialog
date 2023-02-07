import { Button, Heading, Modal, ToggleGroup } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React, { useEffect, useState } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { relocateToWelcomePage } from '../utils/navigationUtils';

const DevFooter: React.FunctionComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const setMockUser = (user: string) => {
        localStorage.setItem('mockUser', user);
    };

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.ctrlKey && e.code === 'KeyB') {
                setShowModal(!showModal);
            }
        });
    }, []);
    if (showModal) {
        return (
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <ModalContent>
                    <Heading level="1" size="medium">
                        Velg brukerprofil
                    </Heading>
                    <FormBlock>
                        <ToggleGroup defaultValue={localStorage.getItem('mockUser') || 'soker1'} onChange={setMockUser}>
                            <ToggleGroup.Item value="soker1">Søker 1</ToggleGroup.Item>
                            <ToggleGroup.Item value="soker2">Søker 2</ToggleGroup.Item>
                            <ToggleGroup.Item value="soker3">Søker 3</ToggleGroup.Item>
                            <ToggleGroup.Item value="soker4">Søker 4</ToggleGroup.Item>
                            <ToggleGroup.Item value="soker5">Søker 5</ToggleGroup.Item>
                        </ToggleGroup>
                    </FormBlock>
                    <FormBlock>
                        <Button type="button" onClick={() => relocateToWelcomePage()}>
                            Start på nytt
                        </Button>
                    </FormBlock>
                </ModalContent>
            </Modal>
        );
    }
    return null;
};

export default DevFooter;
