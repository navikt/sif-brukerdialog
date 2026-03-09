import { Alert, Button, Heading, VStack } from '@navikt/ds-react';

import { SøknadPage } from '../../components/søknad-page/SøknadPage';

export const KvitteringPage = () => {
    const onRestart = () => {
        window.location.reload();
    };

    return (
        <SøknadPage documentTitle="Kvittering">
            <VStack gap="space-24">
                <Heading size="xlarge">Kvittering</Heading>
                <Alert variant="success">Søknaden din er sendt inn!</Alert>
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </VStack>
        </SøknadPage>
    );
};
