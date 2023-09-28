import React from 'react';
import { useIntl } from 'react-intl';
import { getArbeidstidPeriodeIntl } from '../../i18n/arbeidstidPeriodeMessages';
import ArbeidstidPeriodeForm, { ArbeidstidPeriodeFormProps } from '../arbeidstid-periode-form/ArbeidstidPeriodeForm';
import { Modal } from '@navikt/ds-react';
import './arbeidstidPeriodeDialog.less';
interface Props {
    isOpen: boolean;
    formProps: ArbeidstidPeriodeFormProps;
}

const ArbeidstidPeriodeDialog: React.FunctionComponent<Props> = ({ isOpen, formProps }) => {
    const { intlText } = getArbeidstidPeriodeIntl(useIntl());
    return isOpen ? (
        <Modal
            open={isOpen}
            portal={true}
            aria-label={intlText('arbeidstidPeriodeDialog.contentLabel')}
            onClose={formProps.onCancel}
            className="arbeidstidPeriodeDialog">
            <div>
                <ArbeidstidPeriodeForm {...formProps} />
            </div>
        </Modal>
    ) : null;
};

export default ArbeidstidPeriodeDialog;
