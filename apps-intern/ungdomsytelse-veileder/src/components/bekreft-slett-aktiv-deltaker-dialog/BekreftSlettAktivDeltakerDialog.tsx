import { BodyLong, Button, Dialog, VStack } from '@navikt/ds-react';

interface Props {
    deltakerNavn: string;
    onBekreft: () => void;
    onAvbryt: () => void;
    open: boolean;
}

const BekreftSlettAktivDeltakerDialog = ({ deltakerNavn, onBekreft, onAvbryt, open }: Props) => (
    <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
            if (nextOpen === false) {
                onAvbryt();
            }
        }}>
        <Dialog.Popup id="bekreft-slett-aktiv-deltaker-dialog" role="alertdialog" closeOnOutsideClick={false}>
            <Dialog.Header withClosebutton={false}>
                <Dialog.Title>Bekreft sletting</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <VStack gap="6">
                    <BodyLong size="large">
                        Er du helt sikker på at du ønsker å registrere {deltakerNavn} som slettet deltaker i
                        ungdomsprogrammet? Dette kan ikke angres.
                    </BodyLong>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant="secondary" onClick={onAvbryt} data-color="neutral">
                    Nei, avbryt
                </Button>
                <Button variant="danger" onClick={onBekreft}>
                    Ja, registrer sletting
                </Button>
            </Dialog.Footer>
        </Dialog.Popup>
    </Dialog>
);

export default BekreftSlettAktivDeltakerDialog;
