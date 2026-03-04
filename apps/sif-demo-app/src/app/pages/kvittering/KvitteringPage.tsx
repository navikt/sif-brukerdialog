import { Alert, Button, Heading, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

export const KvitteringPage = () => {
    const navigate = useNavigate();

    return (
        <VStack gap="space-16">
            <Heading size="xlarge">Kvittering</Heading>
            <Alert variant="success">Søknaden din er sendt inn!</Alert>
            <Button variant="secondary" onClick={() => navigate('/')}>
                Tilbake til forsiden
            </Button>
        </VStack>
    );
};
