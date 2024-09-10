import { Alert } from '@navikt/ds-react';
import { useAppIntl } from '../../../../i18n';

const IkkeHøyereRisikoForFraværAlert = () => {
    const { text } = useAppIntl();
    return <Alert variant="info">{text('steg.omBarnet.spm.høyereRisikoForFravær.alert')}</Alert>;
};

export default IkkeHøyereRisikoForFraværAlert;
