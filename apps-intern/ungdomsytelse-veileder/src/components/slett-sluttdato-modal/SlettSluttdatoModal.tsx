import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Deltaker } from '../../types/Deltaker';
import { Deltakelse } from '../../types/Deltakelse';
import SlettSluttdatoForm from '../../forms/slett-sluttdato-form/SlettSluttdatoForm';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onCancel: () => void;
}

const SlettSluttdatoModal = ({ deltaker, deltakelse, onCancel }: Props) => {
    const [sluttdatoSlettet, setSluttdatoSlettet] = useState(false);

    const handleOnSluttdatoSlettet = () => {
        setSluttdatoSlettet(true);
    };

    const queryClient = useQueryClient();

    const handleOnClose = () => {
        if (sluttdatoSlettet) {
            queryClient.resetQueries();
        }
        onCancel();
    };

    return (
        <Modal open={true} onClose={handleOnClose} aria-labelledby="slett-modal-heading" width="medium">
            <Modal.Header closeButton={true}>
                <Heading level="1" size="large" id="slett-modal-heading">
                    Slett sluttdato
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {sluttdatoSlettet ? (
                        <Alert variant="success">Sluttdatoen er slettet.</Alert>
                    ) : (
                        <SlettSluttdatoForm
                            deltaker={deltaker}
                            deltakelse={deltakelse}
                            onCancel={onCancel}
                            onSluttdatoSlettet={handleOnSluttdatoSlettet}
                        />
                    )}
                </Box>
            </Modal.Body>
            {sluttdatoSlettet ? (
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOnClose}>
                        Ok, lukk dialog
                    </Button>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default SlettSluttdatoModal;
