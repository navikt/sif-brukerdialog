import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../../i18n';

const IkkeKroniskEllerFunksjonshemningAlert = () => {
    return (
        <Alert variant="info">
            <AppText id="steg.omBarnet.alert.ikkeKroniskSykdom" />
        </Alert>
    );
};

export default IkkeKroniskEllerFunksjonshemningAlert;
