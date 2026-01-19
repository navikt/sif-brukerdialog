import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltaker } from '../../types/Deltaker';
import SlettAktivDeltakerForm from '../../forms/slett-aktiv-deltaker-form/SlettAktivDeltakerForm';
import { Deltakelse } from '../../types/Deltakelse';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
}

const SlettAktivDeltakerModal = ({ deltaker, deltakelse, onCancel }: Props) => {
    const [deltakelseSlettet, setDeltakelseSlettet] = useState(false);

    const handleOnDeltakelseSlettet = () => {
        setDeltakelseSlettet(true);
    };

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const gåTilForsiden = () => {
        navigate('/');
    };

    const handleOnClose = () => {
        if (deltakelseSlettet) {
            queryClient.resetQueries();
            if (!deltakelse.søktTidspunkt) {
                gåTilForsiden();
            }
        } else {
            onCancel();
        }
    };

    return (
        <Modal open={true} onClose={handleOnClose} aria-labelledby="slett-modal-heading" width="medium">
            <Modal.Header closeButton={true}>
                <Heading level="1" size="large" id="slett-modal-heading">
                    Slett deltaker
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseSlettet ? (
                        <Alert variant="success">Deltakeren er slettet.</Alert>
                    ) : (
                        <SlettAktivDeltakerForm
                            deltaker={deltaker}
                            deltakelse={deltakelse}
                            onCancel={onCancel}
                            onDeltakerSlettet={handleOnDeltakelseSlettet}
                        />
                    )}
                </Box>
            </Modal.Body>
            {deltakelseSlettet ? (
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOnClose}>
                        Ok, lukk dialog
                    </Button>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default SlettAktivDeltakerModal;
