import { Heading, Modal, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import EndreStartdatoForm from '../../forms/endre-startdato/EndreStartdatoForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onClose: () => void;
}

const EndreStartdatoModal = ({ deltakelse, deltaker, onClose }: Props) => {
    return (
        <Modal open={true} onClose={() => onClose()} aria-labelledby="oppgave-modal-heading">
            <Modal.Header>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    Endre startdato
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <VStack gap="4" style={{ minWidth: '600px' }}>
                    <EndreStartdatoForm
                        deltakelse={deltakelse}
                        deltakelser={[]}
                        deltaker={deltaker}
                        onClose={onClose}
                    />
                </VStack>
            </Modal.Body>
        </Modal>
    );
};

export default EndreStartdatoModal;
