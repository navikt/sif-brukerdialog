import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import EndrePeriodeForm from '../../forms/endre-periode-form/EndrePeriodeForm';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';

interface Props {
    variant: EndrePeriodeVariant;
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    deltakelseChanged?: boolean;
    onDeltakelseChanged: (deltakelse: Deltakelse) => void;
    onClose: () => void;
}

const EndrePeriodeModal = ({
    variant,
    deltakelse,
    deltaker,
    onClose,
    onDeltakelseChanged,
    deltakelseChanged,
}: Props) => {
    return (
        <Modal open={true} onClose={() => onClose()} aria-labelledby="oppgave-modal-heading" width="medium">
            <Modal.Header closeButton={!!deltakelseChanged}>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    {getModalHeader(variant, deltakelse)}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '600px' }}>
                    {deltakelseChanged ? (
                        <Alert variant="success">Deltakelsen er oppdatert.</Alert>
                    ) : (
                        <EndrePeriodeForm
                            variant={variant}
                            deltakelse={deltakelse}
                            deltaker={deltaker}
                            onCancel={onClose}
                            onDeltakelseChanged={onDeltakelseChanged}
                        />
                    )}
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

const getModalHeader = (formVariant: EndrePeriodeVariant, deltakelse: Deltakelse) => {
    if (formVariant === EndrePeriodeVariant.startdato) {
        return 'Endre startdato';
    }
    return deltakelse.tilOgMed ? 'Endre sluttdato' : 'Registrer sluttdato';
};
export default EndrePeriodeModal;
