import { Alert } from '@navikt/ds-react';

const IkkeAnsattMelding = () => {
    return (
        <Alert variant="warning">
            Når du ikke er ansatt her lenger, må du be denne arbeidsgiveren om å sende en ny A-melding med sluttdato.
            Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.
        </Alert>
    );
};

export default IkkeAnsattMelding;
