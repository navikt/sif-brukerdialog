import { Alert, Button, Heading, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

import { useAppIntl } from '../../i18n';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const onRestart = () => {
        window.location.replace('/sif-demo');
    };
    return (
        <ApplicationPage documentTitle="Kvittering" applicationTitle={text('application.title')}>
            <VStack gap="space-24">
                <Heading size="xlarge">Kvittering</Heading>
                <Alert variant="success">Søknaden din er sendt inn!</Alert>
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </VStack>
        </ApplicationPage>
    );
};
