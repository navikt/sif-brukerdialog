import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { FerieuttakDialogForm, FerieuttakDialogFormConfig } from './FerieuttakDialogForm';
import { Ferieuttak } from './types';

interface Props extends FerieuttakDialogFormConfig {
    ferieuttak?: Ferieuttak;
    alleFerieuttak?: Ferieuttak[];
    minDate: Date;
    maxDate: Date;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (ferieuttak: Ferieuttak) => void;
}

export const FerieuttakFormDialog = ({
    isOpen,
    ferieuttak,
    alleFerieuttak,
    minDate,
    maxDate,
    disableWeekends,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'ferieuttakForm';

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
                        <SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FerieuttakDialogForm
                        formId={formId}
                        ferieuttak={ferieuttak}
                        alleFerieuttak={alleFerieuttak}
                        minDate={minDate}
                        maxDate={maxDate}
                        disableWeekends={disableWeekends}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {ferieuttak ? (
                            <SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.ferieuttak.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
