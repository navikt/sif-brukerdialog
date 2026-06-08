import './tilsynsordningPeriodeDialog.less';

import { useAppIntl } from '@app/i18n';
import { Modal } from '@navikt/ds-react';

import TilsynsordningPeriodeForm, {
    TilsynsordningPeriodeFormProps,
} from '../tilsynsordning-periode-form/TilsynsordningPeriodeForm';

interface Props {
    isOpen: boolean;
    formProps: Pick<TilsynsordningPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const TilsynsordningPeriodeDialog = ({ formProps, isOpen }: Props) => {
    const { text } = useAppIntl();
    return isOpen ? (
        <Modal
            open={isOpen}
            onClose={formProps.onCancel}
            className="tilsynsordningPeriodeDialog"
            portal={true}
            header={{
                heading: text('tilsynsordningPeriodeDialog.contentLabel'),
                closeButton: true,
            }}>
            <Modal.Body>
                <TilsynsordningPeriodeForm {...formProps} />
            </Modal.Body>
        </Modal>
    ) : null;
};

export default TilsynsordningPeriodeDialog;
