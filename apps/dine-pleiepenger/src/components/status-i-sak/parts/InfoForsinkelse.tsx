import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

const InfoForsinkelse = () => {
    return (
        <Alert size="small" variant="info" inline={true}>
            <AppText id="info.forsinkelse" />
        </Alert>
    );
};

export default InfoForsinkelse;
