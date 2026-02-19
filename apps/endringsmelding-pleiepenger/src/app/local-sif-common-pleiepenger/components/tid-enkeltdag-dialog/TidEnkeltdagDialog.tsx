import './styles/tidEnkeltdagDialog.less';

import { Dialog } from '@navikt/ds-react';

import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';

export interface TidEnkeltdagDialogProps {
    open?: boolean;
    dialogTitle: string;
    formProps: TidEnkeltdagFormProps;
}

const TidEnkeltdagDialog = ({ open = false, formProps, dialogTitle }: TidEnkeltdagDialogProps) => {
    if (!open) {
        return null;
    }
    return (
        <Dialog
            open={true}
            defaultOpen={true}
            onOpenChange={(isOpen) => isOpen === false && formProps.onCancel()}
            size="medium">
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>{dialogTitle}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <TidEnkeltdagForm {...formProps} />
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};

export default TidEnkeltdagDialog;
