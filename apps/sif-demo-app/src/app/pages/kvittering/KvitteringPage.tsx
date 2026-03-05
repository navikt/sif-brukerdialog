import { Alert, Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { DefaultPage } from '../../components/default-page/DefaultPage';

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
