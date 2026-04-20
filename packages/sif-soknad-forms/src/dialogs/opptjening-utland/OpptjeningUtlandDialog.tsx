import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { OpptjeningUtlandDialogForm } from './OpptjeningUtlandDialogForm';
import { OpptjeningUtland } from './types';

interface Props {
    opptjening?: OpptjeningUtland;
    minDate: Date;
    maxDate: Date;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (opptjening: OpptjeningUtland) => void;
}

export const OpptjeningUtlandFormDialog = ({
    isOpen,
    opptjening,
    minDate,
    maxDate,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'opptjeningUtlandForm';

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
                        <SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <OpptjeningUtlandDialogForm
                        formId={formId}
                        opptjening={opptjening}
                        minDate={minDate}
                        maxDate={maxDate}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {opptjening ? (
                            <SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.opptjeningUtland.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
