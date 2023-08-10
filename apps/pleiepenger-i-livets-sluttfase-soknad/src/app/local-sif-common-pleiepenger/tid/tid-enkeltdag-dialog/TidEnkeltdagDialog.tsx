import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib/dateFormatter';
import Modal from 'nav-frontend-modal';
import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';
import './styles/tidEnkeltdagDialog.less';

export interface TidEnkeltdagDialogProps {
    isOpen?: boolean;
    dialogTitle: string;
    formProps: TidEnkeltdagFormProps;
}

const TidEnkeltdagDialog: React.FunctionComponent<TidEnkeltdagDialogProps> = ({
    isOpen = false,
    dialogTitle,
    formProps,
}) => {
    if (!isOpen) {
        return null;
    }
    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={`${dialogTitle} ${dateFormatter.dayDateMonthYear(formProps.dato)}`}
            onRequestClose={formProps.onCancel}
            shouldCloseOnOverlayClick={false}
            className="tidEnkeltdagDialog">
            <TidEnkeltdagForm {...formProps} />
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
