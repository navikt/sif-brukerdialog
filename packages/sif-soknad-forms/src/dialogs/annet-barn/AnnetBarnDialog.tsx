import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { AnnetBarnDialogForm, AnnetBarnDialogFormConfig } from './AnnetBarnDialogForm';
import { AnnetBarn } from './index';

interface Props extends AnnetBarnDialogFormConfig {
    annetBarn?: Partial<AnnetBarn>;
    isOpen?: boolean;
    minDate: Date;
    maxDate: Date;
    onCancel: () => void;
    onValidSubmit: (values: AnnetBarn) => void;
}

export const AnnetBarnDialog = ({
    annetBarn,
    isOpen,
    minDate,
    maxDate,
    disallowedFødselsnumre,
    aldersgrenseText,
    fnrPlaceholder,
    navnPlaceholder,
    showBarnTypeOptions,
    onCancel,
    onValidSubmit,
}: Props) => {
    const formId = 'annetBarnForm';

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
                        <SifSoknadFormsText id="@sifSoknadForms.annetBarn.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <AnnetBarnDialogForm
                        formId={formId}
                        annetBarn={annetBarn}
                        minDate={minDate}
                        maxDate={maxDate}
                        disallowedFødselsnumre={disallowedFødselsnumre}
                        aldersgrenseText={aldersgrenseText}
                        fnrPlaceholder={fnrPlaceholder}
                        navnPlaceholder={navnPlaceholder}
                        showBarnTypeOptions={showBarnTypeOptions}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.annetBarn.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>
                        <SifSoknadFormsText id="@sifSoknadForms.annetBarn.dialog.okKnapp" />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
