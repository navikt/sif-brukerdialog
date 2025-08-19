import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlettDeltakerForm from './SlettDeltakerForm';
import { useQueryClient } from '@tanstack/react-query';
import { AppHendelse } from '../../utils/analytics';
import { useAppEventLogger } from '../../utils/analyticsHelper';
import { Deltaker } from '../../types/Deltaker';

interface Props {
    deltaker: Deltaker;
    onCancel: () => void;
}

const SlettDeltakerModal = ({ deltaker, onCancel }: Props) => {
    const [deltakelseSlettet, setDeltakelseSlettet] = useState(false);
    const { log } = useAppEventLogger();

    const handleOnDeltakelseSlettet = async () => {
        setDeltakelseSlettet(true);
        await log(AppHendelse.deltakerSlettet);
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
                    Slett deltaker
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseSlettet ? (
                        <Alert variant="success">Deltakeren er slettet.</Alert>
                    ) : (
                        <SlettDeltakerForm
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

export default SlettDeltakerModal;
