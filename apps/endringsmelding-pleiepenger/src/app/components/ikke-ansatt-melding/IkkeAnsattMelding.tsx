import { Alert } from '@navikt/ds-react';

const IkkeAnsattMelding = () => {
    return (
        <Alert variant="warning">
            Er du feilregistrert eller du har sluttet i dette arbeidsforholdet før perioden du søkte pleiepenger, må du
            be arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og
            personalsystem, eller via Altinn.
        </Alert>
    );
};

export default IkkeAnsattMelding;
