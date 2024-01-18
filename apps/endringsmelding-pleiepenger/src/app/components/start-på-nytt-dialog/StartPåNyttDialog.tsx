import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';

interface Props {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const StartPåNyttDialog: React.FunctionComponent<Props> = ({ open, onCancel, onConfirm }) => (
    <ConfirmationDialog
        open={open}
        title="Oops"
        onConfirm={onConfirm}
        onCancel={onCancel}
        okLabel="Starte på nytt"
        cancelLabel="Fortsette der jeg var">
        <BodyShort spacing={true}>Du har trykket deg tilbake til startsiden.</BodyShort>
        <BodyShort spacing={true}>Vil du starte utfyllingen på nytt eller fortsette der du var?</BodyShort>
    </ConfirmationDialog>
);

export default StartPåNyttDialog;
