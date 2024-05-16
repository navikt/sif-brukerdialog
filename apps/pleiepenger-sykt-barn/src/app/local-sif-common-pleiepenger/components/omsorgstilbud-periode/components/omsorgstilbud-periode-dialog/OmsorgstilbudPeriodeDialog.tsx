import { Modal } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import OmsorgstilbudPeriodeForm, {
    OmsorgstilbudPeriodeFormProps,
} from '../omsorgstilbud-periode-form/OmsorgstilbudPeriodeForm';
import './omsorgstilbudPeriodeDialog.less';

interface Props {
    isOpen: boolean;
    formProps: Pick<OmsorgstilbudPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const OmsorgstilbudPeriodeDialog = ({ formProps, isOpen }: Props) => {
    const { text } = useAppIntl();
    return isOpen ? (
        <Modal
            open={isOpen}
            onClose={formProps.onCancel}
            className="omsorgstilbudPeriodeDialog"
            portal={true}
            header={{
                heading: text('omsorgstilbudPeriodeDialog.contentLabel'),
                closeButton: true,
            }}>
            <Modal.Body>
                <OmsorgstilbudPeriodeForm {...formProps} />
            </Modal.Body>
        </Modal>
    ) : null;
};

export default OmsorgstilbudPeriodeDialog;
