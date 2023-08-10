import React from 'react';
import { useIntl } from 'react-intl';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { getArbeidstidPeriodeIntl } from '../../i18n/arbeidstidPeriodeMessages';
import ArbeidstidPeriodeForm, { ArbeidstidPeriodeFormProps } from '../arbeidstid-periode-form/ArbeidstidPeriodeForm';
import './arbeidstidPeriodeDialog.less';

interface Props {
    isOpen: boolean;
    formProps: ArbeidstidPeriodeFormProps;
}

const ArbeidstidPeriodeDialog: React.FunctionComponent<Props> = ({ isOpen, formProps }) => {
    const { intlText } = getArbeidstidPeriodeIntl(useIntl());
    return isOpen ? (
        <Modal
            isOpen={isOpen}
            contentLabel={intlText('arbeidstidPeriodeDialog.contentLabel')}
            onRequestClose={formProps.onCancel}
            shouldCloseOnOverlayClick={false}
            className="arbeidstidPeriodeDialog">
            <Normaltekst tag="div">
                <ArbeidstidPeriodeForm {...formProps} />
            </Normaltekst>
        </Modal>
    ) : null;
};

export default ArbeidstidPeriodeDialog;
