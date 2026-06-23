import { BodyLong, Button, Dialog, VStack } from '@navikt/ds-react';

interface Props {
    title: string;
    content: React.ReactNode;
    confirmButtonText: string;
    cancelButtonText: string;
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
}

const ConfirmDialog = ({ title, content, confirmButtonText, cancelButtonText, onConfirm, onCancel, open }: Props) => (
    <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
            if (nextOpen === false) {
                onCancel();
            }
        }}>
        <Dialog.Popup id="bekreft-slett-aktiv-deltaker-dialog" role="alertdialog" closeOnOutsideClick={false}>
            <Dialog.Header withClosebutton={false}>
                <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <VStack gap="space-24">
                    <BodyLong size="large">{content}</BodyLong>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant="secondary" onClick={onCancel} data-color="neutral">
                    {cancelButtonText}
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </Dialog.Footer>
        </Dialog.Popup>
    </Dialog>
);

export default ConfirmDialog;
