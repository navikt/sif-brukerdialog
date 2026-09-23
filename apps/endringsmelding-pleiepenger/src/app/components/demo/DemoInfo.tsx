import './demo.css';

import { GlobalAlert, VStack } from '@navikt/ds-react';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';

const DemoInfo = () => (
    <GlobalAlert status="warning" style={{ maxWidth: '100%' }}>
        <GlobalAlert.Header>
            <VStack gap="space-4" align="center">
                <GlobalAlert.Title>Demo - {EndringsmeldingPsbApp.tittel.nb}</GlobalAlert.Title>
            </VStack>
        </GlobalAlert.Header>
    </GlobalAlert>
);

export default DemoInfo;
