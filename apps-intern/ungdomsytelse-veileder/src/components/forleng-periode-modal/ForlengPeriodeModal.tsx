import { Heading, Modal } from '@navikt/ds-react';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import ForlengPeriodeForm from '../../forms/forleng-periode-form/ForlengPeriodeForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;

    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
    onClose: () => void;
}

const ForlengPeriodeModal = ({ deltaker, deltakelse, onDeltakelseChanged, onClose }: Props) => {
    return (
        <Modal open={true} onClose={() => onClose()} aria-labelledby="oppgave-modal-heading" width="medium">
            <Modal.Header closeButton={true}>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    Registrer forlenget periode
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <ForlengPeriodeForm
                    deltakelse={deltakelse}
                    deltaker={deltaker}
                    onCancel={onClose}
                    onDeltakelseChanged={onDeltakelseChanged}
                />
            </Modal.Body>
        </Modal>
    );
};

export default ForlengPeriodeModal;
