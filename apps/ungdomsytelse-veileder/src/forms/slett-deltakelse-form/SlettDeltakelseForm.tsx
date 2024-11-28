import { Deltakelse } from '../../api/types';
import { useState } from 'react';
import { Alert, BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import ConfirmationDialog from '@navikt/sif-common-formik-ds/src/components/helpers/confirmation-dialog/ConfirmationDialog';
import { useSlettDeltakelse } from '../../hooks/useSlettDeltakelse';

interface Props {
    deltakelse: Deltakelse;
    onDeltakelseSlettet: () => void;
}

const SlettDeltakelseForm = ({ deltakelse, onDeltakelseSlettet }: Props) => {
    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
    const { pending, slettDeltakelse, error } = useSlettDeltakelse(onDeltakelseSlettet || (() => {}));

    return (
        <>
            <VStack gap="4" maxWidth={'50rem'} width={'100%'}>
                <Heading level="2" size="medium">
                    Slett deltakerperiode
                </Heading>

                <BodyShort>
                    Nulla ullamcorper sed eros quis dictum. Aenean pharetra lorem risus, et tincidunt nisl porttitor
                    vel. Curabitur vitae accumsan est, eget rutrum ante. Proin vulputate erat et lorem tincidunt
                    faucibus. Curabitur vel pretium odio. Morbi lobortis laoreet felis at mattis. Curabitur a enim id
                    erat tincidunt tempor
                </BodyShort>

                <HStack gap="2">
                    <Button
                        type="button"
                        variant="primary"
                        loading={pending}
                        onClick={() => setConfirmationDialogVisible(true)}>
                        Slett periode
                    </Button>
                </HStack>
                {error ? <Alert variant="error">{error}</Alert> : null}
            </VStack>

            <ConfirmationDialog
                okLabel="Ja, slett"
                onCancel={() => {
                    setConfirmationDialogVisible(false);
                }}
                onConfirm={() => {
                    setConfirmationDialogVisible(false);
                    slettDeltakelse(deltakelse);
                }}
                open={confirmationDialogVisible}
                title="Bekreft slett periode">
                Bekreft at du ønsker å slette deltakelsesperioden
            </ConfirmationDialog>
        </>
    );
};

export default SlettDeltakelseForm;
