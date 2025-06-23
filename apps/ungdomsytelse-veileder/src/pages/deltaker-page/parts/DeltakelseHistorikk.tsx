import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useDeltakelserHistorikk } from '../../../hooks/useDeltakelseHistorikk';
import DeltakelseHistorikkListe from '../../../components/deltakelse-historikk-liste/DeltakelseHistorikkListe';
import { getDeltakelseHistorikkTilInnslag } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelseId?: string;
}

const HistorikkHeader = () => {
    return (
        <Heading level="2" size="medium">
            Historikk
        </Heading>
    );
};

const DeltakelseHistorikk = ({ deltakelseId }: Props) => {
    const historikk = useDeltakelserHistorikk(deltakelseId || '', !!deltakelseId);

    if (historikk.isLoading) {
        return (
            <VStack gap="4">
                <HistorikkHeader />
                <VStack gap="2">
                    <Skeleton height="2rem" variant="rectangle" />
                    <Skeleton height="2rem" variant="rectangle" />
                    <Skeleton height="2rem" variant="rectangle" />
                </VStack>
            </VStack>
        );
    }
    if (historikk.isError) {
        return (
            <VStack gap="4">
                <HistorikkHeader />
                <Alert variant="error" size="small">
                    Det oppstod en feil ved henting av historikk.
                </Alert>
                {historikk.error.message}
            </VStack>
        );
    }

    return (
        <VStack gap="4">
            <HistorikkHeader />
            <DeltakelseHistorikkListe historikkInnslag={getDeltakelseHistorikkTilInnslag(historikk.data || [])} />
        </VStack>
    );
};

export default DeltakelseHistorikk;
