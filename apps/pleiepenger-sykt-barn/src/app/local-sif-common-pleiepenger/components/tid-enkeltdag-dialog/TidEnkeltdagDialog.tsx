import { Modal } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';
import './styles/tidEnkeltdagDialog.less';

export interface TidEnkeltdagDialogProps {
    open?: boolean;
    dialogTitle: string;
    formProps: TidEnkeltdagFormProps;
}

const TidEnkeltdagDialog: React.FunctionComponent<TidEnkeltdagDialogProps> = ({
    open = false,
    formProps,
    dialogTitle,
}) => {
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
                heading: `${dialogTitle} ${dateFormatter.dayDateMonthYear(formProps.dato)}`,
                closeButton: true,
            }}>
            <Modal.Body>
                <TidEnkeltdagForm {...formProps} />
            </Modal.Body>
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
