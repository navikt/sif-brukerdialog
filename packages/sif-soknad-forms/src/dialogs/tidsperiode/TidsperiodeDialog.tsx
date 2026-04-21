import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { TidsperiodeDialogForm } from './TidsperiodeDialogForm';
import { DateTidsperiode } from './types';

interface Props {
    tidsperiode?: DateTidsperiode;
    alleTidsperioder?: DateTidsperiode[];
    minDate?: Date;
    maxDate?: Date;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (tidsperiode: DateTidsperiode) => void;
}

export const TidsperiodeFormDialog = ({
    isOpen,
    tidsperiode,
    alleTidsperioder,
    minDate,
    maxDate,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'tidsperiodeForm';

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
                        <SifSoknadFormsText id="@sifSoknadForms.tidsperiode.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <TidsperiodeDialogForm
                        formId={formId}
                        tidsperiode={tidsperiode}
                        alleTidsperioder={alleTidsperioder}
                        minDate={minDate}
                        maxDate={maxDate}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.tidsperiode.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId} type="submit">
                        {tidsperiode ? (
                            <SifSoknadFormsText id="@sifSoknadForms.tidsperiode.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.tidsperiode.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
