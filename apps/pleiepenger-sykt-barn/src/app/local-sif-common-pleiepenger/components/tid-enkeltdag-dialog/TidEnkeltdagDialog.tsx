import { Heading, Modal } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
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
            shouldCloseOnOverlayClick={false}
            className="tidEnkeltdagDialog">
            <ModalContent>
                <Heading level="1" size="medium" style={{ paddingRight: '3rem', minWidth: '14rem' }}>
                    {`${dialogTitle} ${dateFormatter.dayDateMonthYear(formProps.dato)}`}
                </Heading>
            </ModalContent>
            <TidEnkeltdagForm {...formProps} />
        </Modal>
    ) : null;
};

export default TidEnkeltdagDialog;
