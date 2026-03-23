import { AppText } from '@app/i18n';
import { Alert } from '@navikt/ds-react';

const IkkeAnsattMelding = () => {
    return (
        <Alert variant="warning">
            <AppText id="ikkeAnsattMelding.tekst" />
        </Alert>
    );
};

export default IkkeAnsattMelding;
