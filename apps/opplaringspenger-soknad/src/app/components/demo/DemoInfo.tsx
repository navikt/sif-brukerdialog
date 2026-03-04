import { GlobalAlert, VStack } from '@navikt/ds-react';

const DemoInfo = () => {
    return (
        <GlobalAlert status="warning" style={{ maxWidth: '100%' }}>
            <GlobalAlert.Header>
                <VStack gap="space-4" align="center">
                    <GlobalAlert.Title>Demo - søknad om opplæringspenger</GlobalAlert.Title>
                </VStack>
            </GlobalAlert.Header>
        </GlobalAlert>
    );
};

export default DemoInfo;
