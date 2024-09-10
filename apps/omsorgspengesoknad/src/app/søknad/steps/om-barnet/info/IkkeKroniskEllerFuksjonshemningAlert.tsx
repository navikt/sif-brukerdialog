import { Alert } from '@navikt/ds-react';
import { useAppIntl } from '../../../../i18n';

const IkkeKroniskEllerFunksjonshemningAlert = () => {
    const { text } = useAppIntl();
    return <Alert variant="info">{text('steg.omBarnet.alert.ikkeKroniskSykdom')}</Alert>;
};

export default IkkeKroniskEllerFunksjonshemningAlert;
