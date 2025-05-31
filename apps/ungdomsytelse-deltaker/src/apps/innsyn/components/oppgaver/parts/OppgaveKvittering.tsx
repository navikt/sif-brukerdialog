import { Alert, Heading, VStack } from '@navikt/ds-react';
import { forwardRef } from 'react';

const OppgaveKvittering = forwardRef<HTMLDivElement>((_, ref) => (
    <VStack gap="4">
        <Alert variant="success" size="small" ref={ref} tabIndex={-1}>
            <Heading level="2" size="small" spacing>
                Svaret ditt er sendt inn
            </Heading>
            Du vil om kort tid motta et oppdatert vedtak.
        </Alert>
    </VStack>
));

export default OppgaveKvittering;
