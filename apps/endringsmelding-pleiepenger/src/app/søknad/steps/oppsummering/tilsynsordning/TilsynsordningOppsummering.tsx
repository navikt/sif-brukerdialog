import { TilsynsordningApiData } from '@app/types';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Heading, HGrid, InfoCard, Table, VStack } from '@navikt/ds-react';
import { DurationText } from '@navikt/sif-common-ui';
import { DateDurationMap, dateFormatter, dateToISODate } from '@navikt/sif-common-utils';

import { getTilsynsordningOppsummeringInfo } from '../../../../utils';

interface Props {
    tilsynsordning: TilsynsordningApiData;
    tidOpprinnelig?: DateDurationMap;
}

const TilsynsordningOppsummering = ({ tilsynsordning, tidOpprinnelig }: Props) => {
    const dagerMedEndretTilsyn = getTilsynsordningOppsummeringInfo(tilsynsordning, tidOpprinnelig);
    return (
        <VStack gap="space-32">
            <div>
                <Heading level="3" size="small" spacing={true}>
                    Endringer i omsorgstilbud
                </Heading>
                <InfoCard data-color="info">
                    <InfoCard.Content data-color="info" style={{ backgroundColor: 'var(--ax-bg-moderate)' }}>
                        <HGrid gap="space-12" columns="auto 100%" paddingInline="space-0 space-16">
                            <Box paddingBlock="space-4 space-0">
                                <InformationSquareIcon aria-hidden fontSize="1.2rem" />
                            </Box>
                            InfoCard brukes for å fremheve informasjon på en side, uten at det er like kritisk som en
                            alert.
                        </HGrid>
                    </InfoCard.Content>
                </InfoCard>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>Dato</Table.HeaderCell>
                        <Table.HeaderCell>Endret fra</Table.HeaderCell>
                        <Table.HeaderCell>Endret til</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {dagerMedEndretTilsyn.map((dag) => (
                            <Table.Row key={dateToISODate(dag.dato)}>
                                <Table.DataCell>{dateFormatter.compact(dag.dato)}</Table.DataCell>
                                <Table.DataCell>
                                    {dag.tidOpprinnelig ? (
                                        <DurationText
                                            duration={{
                                                hours: dag.tidOpprinnelig.hours,
                                                minutes: dag.tidOpprinnelig.minutes,
                                            }}
                                            fullText={true}
                                        />
                                    ) : (
                                        '-'
                                    )}
                                </Table.DataCell>
                                <Table.DataCell>
                                    <DurationText
                                        duration={{ hours: dag.tid.hours, minutes: dag.tid.minutes }}
                                        fullText={true}
                                    />
                                </Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </VStack>
    );
};

export default TilsynsordningOppsummering;
