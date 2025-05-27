/* eslint-disable no-console */
import { Alert, Heading, Skeleton, VStack } from '@navikt/ds-react';
import { useDeltakelserHistorikk } from '../../../hooks/useDeltakelseHistorikk';
import DeltakelseHistorikkListe from '../../../components/deltakelse-historikk-liste/DeltakelseHistorikkListe';
import { DeltakelseHistorikkDto, Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';

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

export interface DeltakelseHistorikkInnslag {
    tidspunkt: Date;
    revisjonstype: Revisjonstype;
    utfører: string;
}

const mapDeltakelseHistorikkTilInnslag = (historikk: DeltakelseHistorikkDto[]): DeltakelseHistorikkInnslag[] => {
    const innslag: DeltakelseHistorikkInnslag[] = [];
    historikk.forEach((endring) => {
        if (endring.revisjonstype === Revisjonstype.OPPRETTET) {
            innslag.push({
                tidspunkt: dayjs.utc(endring.opprettetTidspunkt).toDate(),
                revisjonstype: endring.revisjonstype,
                utfører: endring.opprettetAv || 'ukjent',
            });
        } else {
            innslag.push({
                tidspunkt: dayjs(endring.endretTidspunkt).toDate(),
                revisjonstype: endring.revisjonstype,
                utfører: endring.endretAv,
            });
        }
    });
    return innslag.sort((a, b) => b.tidspunkt.getTime() - a.tidspunkt.getTime());
};

const DeltakelseHistorikk = ({ deltakelseId }: Props) => {
    const historikk = useDeltakelserHistorikk(deltakelseId || '');

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
        console.error('Feil ved henting av historikk:', historikk.error);
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
        <VStack gap="1">
            <HistorikkHeader />
            <DeltakelseHistorikkListe historikkInnslag={mapDeltakelseHistorikkTilInnslag(historikk.data || [])} />
        </VStack>
    );
};

export default DeltakelseHistorikk;
