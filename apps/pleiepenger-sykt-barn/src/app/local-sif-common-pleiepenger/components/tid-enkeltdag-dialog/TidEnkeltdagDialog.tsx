import { Modal } from '@navikt/ds-react';
import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';
import './styles/tidEnkeltdagDialog.less';

export interface TidEnkeltdagDialogProps {
    open?: boolean;
    dialogTitle: string;
    formProps: TidEnkeltdagFormProps;
}

const TidEnkeltdagDialog = ({ open = false, formProps, dialogTitle }: TidEnkeltdagDialogProps) => {
    if (!open) {
        return null;
    }
    return open ? (
        <Modal
            open={open}
            onClose={formProps.onCancel}
            className="tidEnkeltdagDialog"
            portal={true}
            header={{
                heading: `${dialogTitle}`,
                closeButton: true,
            }}>
            <Modal.Body>
                <TidEnkeltdagForm {...formProps} />
            </Modal.Body>
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
