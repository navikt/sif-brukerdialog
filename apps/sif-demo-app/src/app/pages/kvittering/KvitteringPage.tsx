import { Button, Heading, LocalAlert, VStack } from '@navikt/ds-react';
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
                <LocalAlert status="success">
                    <LocalAlert.Header>
                        <LocalAlert.Title>Søknaden din er sendt inn!</LocalAlert.Title>
                    </LocalAlert.Header>
                </LocalAlert>
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </VStack>
        </ApplicationPage>
    );
};
