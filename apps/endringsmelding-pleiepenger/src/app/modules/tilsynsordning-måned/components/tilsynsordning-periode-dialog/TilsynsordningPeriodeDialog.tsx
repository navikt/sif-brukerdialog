import './tilsynsordningPeriodeDialog.less';

import { useAppIntl } from '@app/i18n';
import { Dialog } from '@navikt/ds-react';

import TilsynsordningPeriodeForm, {
    TilsynsordningPeriodeFormProps,
} from '../tilsynsordning-periode-form/TilsynsordningPeriodeForm';

interface Props {
    isOpen: boolean;
    formProps: Pick<TilsynsordningPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const TilsynsordningPeriodeDialog = ({ formProps, isOpen }: Props) => {
    const { text } = useAppIntl();
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    formProps.onCancel();
                }
            }}>
            <Dialog.Popup className="tilsynsordningPeriodeDialog" closeOnOutsideClick={false}>
                <Dialog.Header>
                    <Dialog.Title>{text('tilsynsordningPeriodeDialog.contentLabel')}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <TilsynsordningPeriodeForm {...formProps} />
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};

export default TilsynsordningPeriodeDialog;
