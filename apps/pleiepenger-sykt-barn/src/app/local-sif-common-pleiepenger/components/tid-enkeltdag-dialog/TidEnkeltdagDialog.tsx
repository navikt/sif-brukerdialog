import { Modal } from '@navikt/ds-react';
import { createPortal } from 'react-dom';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
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
        <>
            {createPortal(
                <Modal
                    open={open}
                    onClose={formProps.onCancel}
                    className="tidEnkeltdagDialog"
                    header={{
                        heading: `${dialogTitle} ${dateFormatter.dayDateMonthYear(formProps.dato)}`,
                        closeButton: true,
                    }}>
                    <Modal.Body>
                        <TidEnkeltdagForm {...formProps} />
                    </Modal.Body>
                </Modal>,
                document.body,
            )}
        </>
    ) : null;
};

export default TidEnkeltdagDialog;
