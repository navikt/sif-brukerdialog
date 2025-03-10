import { Alert, BodyShort, Button, Heading, List, Modal, VStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import EndreStartdatoForm from '../../forms/endre-startdato/EndreStartdatoForm';
import { useState } from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltaker: Deltaker;
    deltakelse: Deltakelse;
    onClose: () => void;
}

const EndreStartdatoModal = ({ deltakelse, deltaker, onClose }: Props) => {
    const [endret, setEndret] = useState(false);
    return (
        <Modal
            open={true}
            onClose={() => onClose()}
            aria-labelledby="oppgave-modal-heading"
            width={endret ? 'medium' : '1000px'}>
            <Modal.Header closeButton={endret === false}>
                <Heading level="1" size="large" id="oppgave-modal-heading">
                    Endre startdato
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <VStack gap="4" style={{ minWidth: '600px' }}>
                    {endret ? (
                        <VStack gap="8">
                            <Heading level="1" size="medium">
                                Startdato er endret
                            </Heading>
                            <Alert variant="success">
                                Startdato for deltakelsen er endret til{' '}
                                <BodyShort weight="semibold" as="span">
                                    {dateFormatter.full(deltakelse.fraOgMed)}
                                </BodyShort>
                                .
                            </Alert>
                            <VStack gap="0">
                                <Heading size="small" level="2">
                                    Hva skjer videre
                                </Heading>
                                <List>
                                    <List.Item>Deltaker får et varsel om endringen på nav.no/minside</List.Item>
                                    <List.Item>
                                        Endringen blir gjeldende fra tidspunktet når deltaker bekrefter endringen, eller
                                        senest 14 dager fra i dag.
                                    </List.Item>
                                    <List.Item>
                                        Deltaker har mulighet til å ikke bekrefte endringen, men må da legge ved en
                                        melding til saksbehandler.
                                    </List.Item>
                                </List>
                            </VStack>
                        </VStack>
                    ) : (
                        <EndreStartdatoForm
                            deltakelse={deltakelse}
                            deltakelser={[]}
                            deltaker={deltaker}
                            onDeltakelseChanged={() => setEndret(true)}
                        />
                    )}
                </VStack>
            </Modal.Body>
            {endret ? (
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onClose()}>
                        Ok, lukk
                    </Button>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
};

export default EndreStartdatoModal;
