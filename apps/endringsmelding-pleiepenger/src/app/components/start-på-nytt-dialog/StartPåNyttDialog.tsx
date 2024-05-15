import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';
import { AppText } from '../../i18n';

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
        <BodyShort spacing={true}>
            <AppText id="startPåNyttDialog.tekst.1" />
        </BodyShort>
        <BodyShort spacing={true}>
            <AppText id="startPåNyttDialog.tekst.2" />
        </BodyShort>
    </ConfirmationDialog>
);

export default StartPåNyttDialog;
