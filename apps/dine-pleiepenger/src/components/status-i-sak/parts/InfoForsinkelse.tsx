import { Alert } from '@navikt/ds-react';
import { AppText } from '../../../i18n';

const InfoForsinkelse = () => {
    return (
        <Alert size="small" variant="info" inline={true}>
            <span className="text-gray-800">
                <AppText id="info.forsinkelse" />
            </span>
        </Alert>
    );
};

export default InfoForsinkelse;
