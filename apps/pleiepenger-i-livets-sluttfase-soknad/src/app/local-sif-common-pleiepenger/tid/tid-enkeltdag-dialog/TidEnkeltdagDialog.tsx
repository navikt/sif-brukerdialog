import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib/dateFormatter';
import TidEnkeltdagForm, { TidEnkeltdagFormProps } from './TidEnkeltdagForm';
import './styles/tidEnkeltdagDialog.less';
import { Modal } from '@navikt/ds-react';

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
            className="tidEnkeltdagDialog">
            <TidEnkeltdagForm {...formProps} />
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
