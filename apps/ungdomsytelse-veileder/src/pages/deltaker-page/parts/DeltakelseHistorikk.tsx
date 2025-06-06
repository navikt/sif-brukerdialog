import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useDeltakelserHistorikk } from '../../../hooks/useDeltakelseHistorikk';
import DeltakelseHistorikkListe from '../../../components/deltakelse-historikk-liste/DeltakelseHistorikkListe';
import { getDeltakelseHistorikkTilInnslag } from '../../../utils/deltakelseUtils';

interface Props {
    deltakelseId?: string;
    søktTidspunkt?: Date;
}

const HistorikkHeader = () => {
    return (
        <Heading level="2" size="medium">
            Historikk
        </Heading>
    );
};

const DeltakelseHistorikk = ({ deltakelseId, søktTidspunkt }: Props) => {
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
            {/* <Alert variant="info" inline>
                Historikkinnslagene er ikke optimale enda, men vi satser på å forbedre dem snart. F.eks. innsendt søknad
                fra deltaker vises som &quot;Endret periode&quot;.
            </Alert> */}
            <DeltakelseHistorikkListe
                historikkInnslag={getDeltakelseHistorikkTilInnslag(historikk.data || [], søktTidspunkt)}
            />
        </VStack>
    );
};

export default DeltakelseHistorikk;
