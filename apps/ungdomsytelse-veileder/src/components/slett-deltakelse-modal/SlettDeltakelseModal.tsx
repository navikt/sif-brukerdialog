import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import SlettDeltakelseForm from './SlettDeltakelseForm';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
}

const SlettDeltakelseModal = ({ deltaker, deltakelse, onCancel }: Props) => {
    const [deltakelseSlettet, setDeltakelseSlettet] = useState(false);

    const handleOnDeltakelseSlettet = () => {
        setDeltakelseSlettet(true);
    };

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const gåTilForsiden = () => {
        queryClient.resetQueries();
        navigate('/');
    };

    return (
        <Modal
            open={true}
            onClose={deltakelseSlettet ? gåTilForsiden : onCancel}
            aria-labelledby="slett-modal-heading"
            width="medium">
            <Modal.Header closeButton={true}>
                <Heading level="1" size="large" id="slett-modal-heading">
                    Slett deltakelse
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseSlettet ? (
                        <Alert variant="success">Deltakelsen er slettet.</Alert>
                    ) : (
                        <SlettDeltakelseForm
                            deltakelse={deltakelse}
                            deltaker={deltaker}
                            onCancel={onCancel}
                            onDeltakelseSlettet={handleOnDeltakelseSlettet}
                        />
                    )}
                </Box>
            </Modal.Body>
            {deltakelseSlettet ? (
                <Modal.Footer>
                    <Button variant="primary" onClick={gåTilForsiden}>
                        Ok, lukk dialog
                    </Button>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default SlettDeltakelseModal;
