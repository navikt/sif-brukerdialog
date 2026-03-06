import { Alert, Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadPage } from '../../components/søknad-page/SøknadPage';

export const KvitteringPage = () => {
    const navigate = useNavigate();

    return (
        <SøknadPage documentTitle="Kvittering">
            <Heading size="xlarge">Kvittering</Heading>
            <Alert variant="success">Søknaden din er sendt inn!</Alert>
            <Button variant="secondary" onClick={() => navigate('/')}>
                Tilbake til forsiden
            </Button>
        </SøknadPage>
    );
};
