import { AppText, useAppIntl } from '@app/i18n';
import { BodyShort } from '@navikt/ds-react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/src/components/dialogs/confirmation-dialog/ConfirmationDialog';

interface Props {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const StartPåNyttDialog = ({ open, onCancel, onConfirm }: Props) => {
    const { text } = useAppIntl();
    return (
    <ConfirmationDialog
        open={open}
        title={text('startPåNyttDialog.tittel')}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okLabel={text('startPåNyttDialog.okLabel')}
        cancelLabel={text('startPåNyttDialog.cancelLabel')}>
        <BodyShort spacing={true}>
            <AppText id="startPåNyttDialog.tekst.1" />
        </BodyShort>
        <BodyShort spacing={true}>
            <AppText id="startPåNyttDialog.tekst.2" />
        </BodyShort>
    </ConfirmationDialog>
    );
};

export default StartPåNyttDialog;
