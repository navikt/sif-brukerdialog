import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/src/dateFormatter';
import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';
import { Modal } from '@navikt/ds-react';
import './styles/tidEnkeltdagDialog.css';
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
            portal={true}
            open={isOpen}
            aria-label={`${dialogTitle} ${dateFormatter.dayDateMonthYear(formProps.dato)}`}
            onClose={formProps.onCancel}
            className="modal tidEnkeltdagDialog">
            <TidEnkeltdagForm {...formProps} />
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
