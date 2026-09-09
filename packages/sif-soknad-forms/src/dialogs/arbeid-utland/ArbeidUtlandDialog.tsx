import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { ArbeidUtland } from '.';
import { ArbeidUtlandDialogForm } from './ArbeidUtlandDialogForm';
import { ISODate } from '@sif/utils';

interface Props {
    minDate?: ISODate;
    maxDate?: ISODate;
    arbeidssted?: ArbeidUtland;
    alleArbeider?: ArbeidUtland[];
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (arbeidssted: ArbeidUtland) => void;
}

export const ArbeidUtlandFormDialog = ({
    isOpen,
    minDate,
    maxDate,
    arbeidssted,
    alleArbeider,
    onValidSubmit,
    onCancel,
}: Props) => {
    const formId = 'arbeidUtlandForm';

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) onCancel();
            }}>
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <ArbeidUtlandDialogForm
                        alleArbeider={alleArbeider}
                        formId={formId}
                        minDate={minDate}
                        maxDate={maxDate}
                        arbeidssted={arbeidssted}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {arbeidssted ? (
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.arbeidUtland.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
