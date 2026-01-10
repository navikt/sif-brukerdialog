import { BodyLong, Heading, Modal } from '@navikt/ds-react';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';

interface Props {
    deltakelse: Deltakelse;
    deltaker: Deltaker;
    onClose: () => void;
}

const SlettAktivDeltakelseModal = ({ onClose }: Props) => {
    return (
        <Modal open={true} onClose={onClose} aria-label="Slett aktiv deltakelse">
            <Modal.Header>
                <Heading level="1" size="medium">
                    Slett aktiv deltakelse
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong>Her kommer skjema for sletting av aktiv deltakelse (ikke implementert enda).</BodyLong>
            </Modal.Body>
        </Modal>
    );
};

export default SlettAktivDeltakelseModal;
