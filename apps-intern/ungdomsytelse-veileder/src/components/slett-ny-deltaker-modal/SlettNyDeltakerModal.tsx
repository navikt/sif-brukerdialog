import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Deltaker } from '../../types/Deltaker';
import SlettNyDeltakerForm from '../../forms/slett-ny-deltaker-form/SlettNyDeltakerForm';

interface Props {
    deltaker: Deltaker;
    onCancel: () => void;
}

const SlettNyDeltakerModal = ({ deltaker, onCancel }: Props) => {
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
                    Slett ny deltaker
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseSlettet ? (
                        <Alert variant="success">Deltakeren er slettet.</Alert>
                    ) : (
                        <SlettNyDeltakerForm
                            deltaker={deltaker}
                            onCancel={onCancel}
                            onDeltakerSlettet={handleOnDeltakelseSlettet}
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

export default SlettNyDeltakerModal;
