import { Heading, Modal } from '@navikt/ds-react';
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import OmsorgstilbudPeriodeForm, {
    OmsorgstilbudPeriodeFormProps,
} from '../omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import './omsorgstilbudPeriodeDialog.less';

interface Props {
    isOpen: boolean;
    formProps: Pick<OmsorgstilbudPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const OmsorgstilbudPeriodeDialog: React.FC<Props> = ({ formProps, isOpen }) => {
    return isOpen ? (
        <Modal
            open={isOpen}
            onClose={formProps.onCancel}
            shouldCloseOnOverlayClick={false}
            className="omsorgstilbudPeriodeDialog">
            <ModalContent>
                <Heading level="1" size="medium" style={{ paddingRight: '3rem', minWidth: '14rem' }}>
                    <FormattedMessage id="omsorgstilbudPeriodeDialog.contentLabel" />
                </Heading>
                <OmsorgstilbudPeriodeForm {...formProps} />
            </ModalContent>
        </Modal>
    ) : null;
};

export default OmsorgstilbudPeriodeDialog;
