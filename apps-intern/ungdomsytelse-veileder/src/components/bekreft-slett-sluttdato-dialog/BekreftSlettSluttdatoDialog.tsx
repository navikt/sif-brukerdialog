import { BodyLong, Button, Dialog, VStack } from '@navikt/ds-react';

interface Props {
    deltakerNavn: string;
    onBekreft: () => void;
    onAvbryt: () => void;
    open: boolean;
}

const BekreftSlettSluttdatoDialog = ({ deltakerNavn, onBekreft, onAvbryt, open }: Props) => (
    <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
            if (nextOpen === false) {
                onAvbryt();
            }
        }}>
        <Dialog.Popup id="bekreft-slett-sluttdato-dialog" role="alertdialog" closeOnOutsideClick={false}>
            <Dialog.Header withClosebutton={false}>
                <Dialog.Title>Bekreft sletting av sluttdato</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <VStack gap="space-24">
                    <BodyLong size="large">
                        Er du helt sikker på at du ønsker å slette sluttdatoen for {deltakerNavn}?
                    </BodyLong>
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant="secondary" onClick={onAvbryt} data-color="neutral">
                    Nei, avbryt
                </Button>
                <Button variant="danger" onClick={onBekreft}>
                    Ja, slett
                </Button>
            </Dialog.Footer>
        </Dialog.Popup>
    </Dialog>
);

export default BekreftSlettSluttdatoDialog;
