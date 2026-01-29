import { BodyLong, Box, GlobalAlert, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

interface Props {
    variant: 'compact' | 'default';
}
const VeilederDemoInformasjon = ({ variant }: Props) => {
    if (variant === 'compact') {
        return (
            <GlobalAlert status="warning" style={{ maxWidth: '100%' }}>
                <GlobalAlert.Header>
                    <VStack gap="space-4">
                        <GlobalAlert.Title>Demo - veilederapplikasjon ungdomsprogramytelsen</GlobalAlert.Title>
                    </VStack>
                </GlobalAlert.Header>
            </GlobalAlert>
        );
    }
    return (
        <PageBoundary>
            <Box marginBlock="space-12">
                <GlobalAlert status="warning">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>Om demoversjon av veilederapplikasjon</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>
                        <VStack gap="space-8">
                            <BodyLong as="div">
                                Dette er en demo av hvordan veilederapplikasjonen er for ungdomsprogramytelsen. All
                                informasjon og datoer som vises i denne er fiktive data.
                            </BodyLong>
                        </VStack>
                    </GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        </PageBoundary>
    );
};

export default VeilederDemoInformasjon;
