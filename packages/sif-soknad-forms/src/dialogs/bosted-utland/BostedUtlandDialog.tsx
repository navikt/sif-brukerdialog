import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { BostedUtland } from '.';
import { BostedUtlandDialogForm } from './BostedUtlandDialogForm';

interface Props {
    minDate?: Date;
    maxDate?: Date;
    bosted?: BostedUtland;
    alleBosteder?: BostedUtland[];
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (bosted: BostedUtland) => void;
}

export const BostedUtlandFormDialog = ({
    isOpen,
    minDate,
    maxDate,
    bosted,
    alleBosteder,
    onValidSubmit,
    onCancel,
}: Props) => {
    const formId = 'bostedUtlandForm';

    if (!isOpen) {
        return null;
    }

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
                        <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BostedUtlandDialogForm
                        alleBosteder={alleBosteder}
                        formId={formId}
                        minDate={minDate}
                        maxDate={maxDate}
                        bosted={bosted}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {bosted ? (
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.bostedUtland.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
