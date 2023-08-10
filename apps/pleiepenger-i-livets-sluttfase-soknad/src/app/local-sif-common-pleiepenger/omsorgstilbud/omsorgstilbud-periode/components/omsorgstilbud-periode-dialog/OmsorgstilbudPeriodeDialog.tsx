import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import OmsorgstilbudPeriodeForm, {
    OmsorgstilbudPeriodeFormProps,
} from '../omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import './omsorgstilbudPeriodeDialog.less';

interface Props {
    isOpen: boolean;
    formProps: Pick<OmsorgstilbudPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const OmsorgstilbudPeriodeDialog: React.FC<Props> = ({ formProps, isOpen }) => {
    const intl = useIntl();
    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={intlHelper(intl, 'omsorgstilbudPeriodeDialog.contentLabel')}
            onRequestClose={formProps.onCancel}
            shouldCloseOnOverlayClick={false}
            className="omsorgstilbudPeriodeDialog">
            <Normaltekst tag="div">
                <OmsorgstilbudPeriodeForm {...formProps} />
            </Normaltekst>
        </Modal>
    ) : null;
};

export default OmsorgstilbudPeriodeDialog;
