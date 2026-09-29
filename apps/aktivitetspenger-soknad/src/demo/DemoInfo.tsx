import { BodyLong, Box, GlobalAlert, Theme, VStack } from '@navikt/ds-react';
import { AktivitetspengerSoknadApp } from '@navikt/sif-app-register';

const DemoInfo = () => (
    <Theme hasBackground={false}>
        <Box
            marginInline="auto"
            paddingInline={{ sm: 'space-16', xs: 'space-8' }}
            marginBlock="space-24 space-24"
            maxWidth="704px">
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
    </Theme>
);

export default DemoInfo;
