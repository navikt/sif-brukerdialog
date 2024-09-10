import { Alert } from '@navikt/ds-react';
import { useAppIntl } from '../../../../i18n';

const IkkeSammeAdresseAlert = () => {
    const { text } = useAppIntl();
    return <Alert variant="info">{text('steg.omBarnet.spm.sammeAdresse.neiAlert')}</Alert>;
};

export default IkkeSammeAdresseAlert;
