import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

const IkkeSammeAdresseAlert = () => {
    return (
        <Alert variant="info">
            <AppText id="steg.omBarnet.alert.sammeAdresse.nei" />
        </Alert>
    );
};

export default IkkeSammeAdresseAlert;
