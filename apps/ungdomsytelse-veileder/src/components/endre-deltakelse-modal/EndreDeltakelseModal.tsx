import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    header: string;
    children: React.ReactNode;
    deltakelseChanged?: boolean;
    onClose: () => void;
}

const EndreDeltakelseModal = ({ header, children, onClose, deltakelseChanged }: Props) => {
    return (
        <Modal
            open={true}
            onClose={() => onClose()}
            aria-labelledby="oppgave-modal-heading"
            width={deltakelseChanged ? 'medium' : '800px'}>
            <Modal.Header closeButton={!!deltakelseChanged}>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    {header}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseChanged ? <Alert variant="success">Deltakelsen er oppdatert.</Alert> : children}
                </Box>
            </Modal.Body>
            {deltakelseChanged ? (
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            onClose();
                        }}>
                        Ok, lukk
                    </Button>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default EndreDeltakelseModal;
