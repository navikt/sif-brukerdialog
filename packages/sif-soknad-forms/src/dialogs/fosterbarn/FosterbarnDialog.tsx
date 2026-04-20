import { Button, Dialog } from '@navikt/ds-react';

import { SifSoknadFormsText } from '../../i18n';
import { FosterbarnDialogForm } from './FosterbarnDialogForm';
import { Fosterbarn } from './types';

interface Props {
    fosterbarn?: Fosterbarn;
    disallowedFødselsnumre?: string[];
    isOpen?: boolean;
    onCancel: () => void;
    onValidSubmit: (fosterbarn: Fosterbarn) => void;
}

export const FosterbarnFormDialog = ({
    isOpen,
    fosterbarn,
    disallowedFødselsnumre,
    onValidSubmit,
    onCancel,
}: Props) => {
    if (!isOpen) return null;

    const formId = 'fosterbarnForm';

    return (
        <Dialog open={isOpen} onOpenChange={onCancel} size="small">
            <Dialog.Popup closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>
                        <SifSoknadFormsText id="@sifSoknadForms.fosterbarn.dialog.tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <FosterbarnDialogForm
                        formId={formId}
                        fosterbarn={fosterbarn}
                        disallowedFødselsnumre={disallowedFødselsnumre}
                        onValidSubmit={onValidSubmit}
                    />
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <SifSoknadFormsText id="@sifSoknadForms.fosterbarn.dialog.avbrytKnapp" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button form={formId}>
                        {fosterbarn ? (
                            <SifSoknadFormsText id="@sifSoknadForms.fosterbarn.dialog.oppdaterKnapp" />
                        ) : (
                            <SifSoknadFormsText id="@sifSoknadForms.fosterbarn.dialog.leggTilKnapp" />
                        )}
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
