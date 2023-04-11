import { BodyShort } from '@navikt/ds-react';
import ConfirmationDialog from '@navikt/sif-common-core-ds/lib/components/dialogs/confirmation-dialog/ConfirmationDialog';
import React from 'react';

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
        okLabel="Start på nytt"
        cancelLabel="Fortsett der jeg var">
        <BodyShort spacing={true}>
            Du har trykket deg tilbake til startsiden for å sende inn en endring i saken din.
        </BodyShort>
        <BodyShort spacing={true}>
            Vi ser at du har begynt å fylle ut en endring, så vil du fortsette der du var? Eller vil du starte helt på
            nytt?
        </BodyShort>
        <BodyShort spacing={true}>
            Hvis du starter på nytt, blir informasjonen du har fylt ut fjernet. Om du vil fortsette der du var, kommer
            du tilbake til siden du var på.
        </BodyShort>
    </ConfirmationDialog>
);

export default StartPåNyttDialog;
