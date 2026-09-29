import { BodyLong, Box, GlobalAlert, VStack } from '@navikt/ds-react';
import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';

const DemoInfo = () => (
    <Box marginInline="auto" marginBlock="space-24" paddingInline={{ sm: 'space-16', xs: 'space-8' }} maxWidth="704px">
        <GlobalAlert status="announcement" style={{ maxWidth: '100%' }}>
            <GlobalAlert.Header>
                <VStack gap="space-4" align="center">
                    <GlobalAlert.Title>Demo - {AktivitetspengerSoknadApp.tittel.nb}</GlobalAlert.Title>
                </VStack>
            </GlobalAlert.Header>
            <GlobalAlert.Content>
                <BodyLong as="div">
                    All informasjon og data som brukes i denne demoen er fiktive. Ingenting sendes videre til andre
                    systemer.
                </BodyLong>
            </GlobalAlert.Content>
        </GlobalAlert>
    </Box>
);

export default DemoInfo;
