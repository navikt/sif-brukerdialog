import { BodyLong, Box, GlobalAlert, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

const VeilederDemoInformasjon = () => {
    return (
        <PageBoundary>
            <Box paddingBlock="space-24 space-0" marginBlock="space-0 space-24">
                <GlobalAlert status="warning">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Demo</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>
                        <VStack gap="space-8">
                            <BodyLong as="div">
                                Dette er en demo av hvordan veilederapplikasjonen er for ungdomsprogramytelsen.
                            </BodyLong>
                            <BodyLong weight="semibold" as="div">
                                All informasjon og datoer som vises i denne er fiktive data.
                            </BodyLong>
                        </VStack>
                    </GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        </PageBoundary>
    );
};

export default VeilederDemoInformasjon;
