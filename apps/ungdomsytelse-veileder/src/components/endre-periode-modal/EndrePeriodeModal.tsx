import { Alert, Box, Button, Heading, Modal } from '@navikt/ds-react';
import EndreStartdatoForm from '../../forms/endre-periode-forms/EndreStartdatoForm';
import { EndrePeriodeVariant } from '../../types/EndrePeriodeVariant';
import { Deltakelse } from '../../types/Deltakelse';
import { Deltaker } from '../../types/Deltaker';
import EndreSluttdatoForm from '../../forms/endre-periode-forms/EndreSluttdatoForm';

const getModalHeader = (formVariant: EndrePeriodeVariant) => {
    switch (formVariant) {
        case EndrePeriodeVariant.startdato:
            return 'Endre startdato';
        case EndrePeriodeVariant.endreSluttdato:
            return 'Endre sluttdato';
        case EndrePeriodeVariant.meldUtDeltaker:
            return 'Registrer sluttdato';
    }
};

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
                    {getModalHeader(variant)}
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Box style={{ minWidth: '400px' }}>
                    {deltakelseChanged ? (
                        <Alert variant="success">Deltakelsen er oppdatert.</Alert>
                    ) : variant === EndrePeriodeVariant.startdato ? (
                        <EndreStartdatoForm
                            deltakelse={deltakelse}
                            deltaker={deltaker}
                            onCancel={onClose}
                            onDeltakelseChanged={onDeltakelseChanged}
                        />
                    ) : (
                        <EndreSluttdatoForm
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

export default EndrePeriodeModal;
