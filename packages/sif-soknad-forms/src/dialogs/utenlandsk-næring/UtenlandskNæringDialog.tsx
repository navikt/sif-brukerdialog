import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { UtenlandskNæring } from './types';
import { UtenlandskNæringDialogForm } from './UtenlandskNæringDialogForm';

interface Props {
    næring?: UtenlandskNæring;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (næring: UtenlandskNæring) => void;
}

export const UtenlandskNæringFormDialog = ({ isOpen, næring, onValidSubmit, onCancel }: Props) => {
    if (!isOpen) return null;

    const formId = 'utenlandskNæringForm';

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}
            size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.utenlandskNæring.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <UtenlandskNæringDialogForm formId={formId} næring={næring} onValidSubmit={onValidSubmit} />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandskNæring.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {næring ? (
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandskNæring.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandskNæring.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
