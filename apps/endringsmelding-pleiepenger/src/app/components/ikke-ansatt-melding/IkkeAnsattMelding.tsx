import { Alert } from '@navikt/ds-react';
import { AppText } from '../../i18n';

const IkkeAnsattMelding = () => {
    return (
        <Alert variant="warning">
            <AppText id="ikkeAnsattMelding.tekst" />
        </Alert>
    );
};

export default IkkeAnsattMelding;
