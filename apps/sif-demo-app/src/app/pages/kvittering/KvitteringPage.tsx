import { Alert, Button, Heading } from '@navikt/ds-react';
import { DefaultPage } from '@rammeverk/components/default-page/DefaultPage';
import { useNavigate } from 'react-router-dom';

export const KvitteringPage = () => {
    const navigate = useNavigate();

    return (
        <DefaultPage documentTitle="Kvittering">
            <Heading size="xlarge">Kvittering</Heading>
            <Alert variant="success">Søknaden din er sendt inn!</Alert>
            <Button variant="secondary" onClick={() => navigate('/')}>
                Tilbake til forsiden
            </Button>
        </DefaultPage>
    );
};
