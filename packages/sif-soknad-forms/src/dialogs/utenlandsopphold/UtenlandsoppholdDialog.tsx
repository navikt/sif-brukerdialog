import { Button, Dialog } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';

import { SifSoknadFormsText } from '../../i18n';
import { UtenlandsoppholdDialogForm } from './UtenlandsoppholdDialogForm';
import { Utenlandsopphold, UtenlandsoppholdVariant } from './types';

interface Props {
    opphold?: Utenlandsopphold;
    alleOpphold?: Utenlandsopphold[];
    variant?: UtenlandsoppholdVariant;
    minDate: Date;
    maxDate: Date;
    disabledDateRanges?: DateRange[];
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (opphold: Utenlandsopphold) => void;
}

export const UtenlandsoppholdFormDialog = ({
    isOpen,
    opphold,
    alleOpphold,
    variant = 'enkel',
    minDate,
    maxDate,
    disabledDateRanges,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'utenlandsoppholdForm';

    return (
        <Dialog open={isOpen} onOpenChange={onCancel} size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.utenlandsopphold.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <UtenlandsoppholdDialogForm
                        formId={formId}
                        opphold={opphold}
                        alleOpphold={alleOpphold}
                        variant={variant}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabledDateRanges={disabledDateRanges}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandsopphold.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>
                        {opphold ? (
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandsopphold.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.utenlandsopphold.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
