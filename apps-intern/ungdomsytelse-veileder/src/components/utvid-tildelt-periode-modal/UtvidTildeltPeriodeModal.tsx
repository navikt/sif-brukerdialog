import { Heading, Modal } from '@navikt/ds-react';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import UtvidDeltakelseForm from '../../forms/utvid-deltakelse-form/UtvidDeltakelseForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;

    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
    onClose: () => void;
}

const UtvidTildeltPeriodeModal = ({ deltaker, deltakelse, onDeltakelseChanged, onClose }: Props) => {
    return (
        <Modal open={true} onClose={() => onClose()} aria-labelledby="oppgave-modal-heading" width="medium">
            <Modal.Header closeButton={true}>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    Registrer utvidet deltakelse
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <UtvidDeltakelseForm
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onCancel={onClose}
                    onDeltakelseChanged={onDeltakelseChanged}
                />
            </Modal.Body>
        </Modal>
    );
};

export default UtvidTildeltPeriodeModal;
