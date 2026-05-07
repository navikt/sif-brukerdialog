import { BodyLong, BodyShort, Box, GlobalAlert, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    variant: 'compact' | 'default';
}
const VeilederDemoInformasjon = ({ variant }: Props) => {
    if (variant === 'compact') {
        return (
            <GlobalAlert status="warning" style={{ maxWidth: '100%' }}>
                <GlobalAlert.Header>
                    <VStack gap="space-4" paddingBlock="space-0 space-12">
                        <GlobalAlert.Title>Demo - veilederapplikasjon ungdomsprogramytelsen</GlobalAlert.Title>
                        <BodyShort>
                            Obs! &quot;Dagens dato&quot; er satt til {dateFormatter.dayDateMonthYear(new Date())}
                        </BodyShort>
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
                        <GlobalAlert.Title>Informasjon om demo</GlobalAlert.Title>
                    </GlobalAlert.Header>
                    <GlobalAlert.Content>
                        <VStack gap="space-8">
                            <BodyLong as="div">
                                Denne demoen viser funksjonaliteten og innholdet i veilederapplikasjonen for
                                ungdomsprogramytelsen. All informasjon som vises er fiktiv og laget kun for demoformål.
                            </BodyLong>
                        </VStack>
                    </GlobalAlert.Content>
                </GlobalAlert>
            </Box>
        </PageBoundary>
    );
};

export default VeilederDemoInformasjon;
