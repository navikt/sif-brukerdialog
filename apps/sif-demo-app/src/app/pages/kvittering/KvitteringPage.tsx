import { Alert, Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { AppPage } from '../../components/app-page/AppPage';

export const KvitteringPage = () => {
    const navigate = useNavigate();

    return (
        <AppPage>
            <Heading size="xlarge">Kvittering</Heading>
            <Alert variant="success">Søknaden din er sendt inn!</Alert>
            <Button variant="secondary" onClick={() => navigate('/')}>
                Tilbake til forsiden
            </Button>
        </AppPage>
    );
};
