import { Modal } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import OmsorgstilbudPeriodeForm, {
    OmsorgstilbudPeriodeFormProps,
} from '../omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import './omsorgstilbudPeriodeDialog.less';
import { createPortal } from 'react-dom';

interface Props {
    isOpen: boolean;
    formProps: Pick<OmsorgstilbudPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const OmsorgstilbudPeriodeDialog: React.FC<Props> = ({ formProps, isOpen }) => {
    const intl = useIntl();
    return isOpen ? (
        <>
            {createPortal(
                <Modal
                    open={isOpen}
                    onClose={formProps.onCancel}
                    className="omsorgstilbudPeriodeDialog"
                    header={{
                        heading: intlHelper(intl, 'omsorgstilbudPeriodeDialog.contentLabel'),
                        closeButton: true,
                    }}>
                    <Modal.Body>
                        <OmsorgstilbudPeriodeForm {...formProps} />
                    </Modal.Body>
                </Modal>,
                document.body,
            )}
        </>
    ) : null;
};

export default OmsorgstilbudPeriodeDialog;
