import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

const IkkeSammeAdresseAlert = () => {
    return (
        <Alert variant="info">
            <AppText id="steg.omBarnet.spm.sammeAdresse.neiAlert" />
        </Alert>
    );
};

export default IkkeSammeAdresseAlert;
