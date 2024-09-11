import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

const IkkeHøyereRisikoForFraværAlert = () => {
    return (
        <Alert variant="info">
            <AppText id="steg.omBarnet.alert.ikkeHøyereRisikoForFravær" />
        </Alert>
    );
};

export default IkkeHøyereRisikoForFraværAlert;
