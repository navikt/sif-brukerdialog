import './tilsynsordningPeriodeDialog.less';

import { useAppIntl } from '@app/i18n';
import { Modal } from '@navikt/ds-react';

import { TilsynsordningPeriodeData } from '../../../../søknad/steps/tilsynsordning-forenklet/types';
import TilsynsordningPeriodeForm, {
    TilsynsordningPeriodeFormProps,
} from '../tilsynsordning-periode-form/TilsynsordningPeriodeForm';

interface Props {
    isOpen: boolean;
    endretPeriode?: TilsynsordningPeriodeData;
    endringerISøknadsperiode: TilsynsordningPeriodeData[];
    formProps: Pick<TilsynsordningPeriodeFormProps, 'periode' | 'onCancel' | 'onSubmit'>;
}

const TilsynsordningPeriodeDialog = ({ formProps, endretPeriode, endringerISøknadsperiode, isOpen }: Props) => {
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
                <TilsynsordningPeriodeForm
                    endretPeriode={endretPeriode}
                    endringerISøknadsperiode={endringerISøknadsperiode}
                    {...formProps}
                />
            </Modal.Body>
        </Modal>
    ) : null;
};

export default TilsynsordningPeriodeDialog;
