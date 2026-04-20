import { Button, Dialog } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-utils';

import { SifSoknadFormsText } from '../../i18n';
import { EnkeltdatoDialogForm } from './EnkeltdatoDialogForm';
import { Enkeltdato } from './types';

interface Props {
    enkeltdato?: Enkeltdato;
    minDate: Date;
    maxDate: Date;
    alleEnkeltdatoer?: Enkeltdato[];
    disabledDateRanges?: DateRange[];
    disableWeekends?: boolean;
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (enkeltdato: Enkeltdato) => void;
}

export const EnkeltdatoFormDialog = ({
    isOpen,
    enkeltdato,
    minDate,
    maxDate,
    alleEnkeltdatoer,
    disabledDateRanges,
    disableWeekends,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'enkeltdatoForm';

    return (
        <Dialog open={isOpen} onOpenChange={onCancel} size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.enkeltdato.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <EnkeltdatoDialogForm
                        formId={formId}
                        enkeltdato={enkeltdato}
                        minDate={minDate}
                        maxDate={maxDate}
                        alleEnkeltdatoer={alleEnkeltdatoer}
                        disabledDateRanges={disabledDateRanges}
                        disableWeekends={disableWeekends}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.enkeltdato.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>
                        {enkeltdato ? (
                            <SifSoknadFormsText id="@sifSoknadForms.enkeltdato.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.enkeltdato.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
