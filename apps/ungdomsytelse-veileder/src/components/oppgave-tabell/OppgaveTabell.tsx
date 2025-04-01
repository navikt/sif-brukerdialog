import { Alert, Box, Heading, HGrid, List, Table, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';

interface Props {
    oppgaver: Oppgave[];
}

export const OppgaveInfo = ({ oppgave }: { oppgave: Oppgave }) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            const { nyStartdato } = oppgave.oppgavetypeData;

            return (
                <HGrid columns="1fr 1fr" gap="10">
                    <VStack>
                        <Heading level="3" size="small">
                            Innhold
                        </Heading>
                        <List>
                            <List.Item>Startdato endret til: {dateFormatter.compact(nyStartdato)}</List.Item>
                        </List>
                    </VStack>
                    <VStack>
                        <Heading level="3" size="small">
                            Status
                        </Heading>
                        <List>
                            <List.Item>Type: {oppgave.oppgavetype}</List.Item>
                            <List.Item>Opprettet: {dateFormatter.compactWithTime(oppgave.opprettetDato)}</List.Item>
                            <List.Item>Svarfrist: {dateFormatter.compactWithTime(oppgave.svarfrist)}</List.Item>
                        </List>
                    </VStack>
                </HGrid>
            );
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <Box>Sluttdato endret til: {dateFormatter.compact(oppgave.oppgavetypeData.nySluttdato)}</Box>;
    }
};

const OppgaveTabell = ({ oppgaver }: Props) => {
    if (oppgaver.length === 0) {
        return (
            <Alert variant="info" inline={true}>
                Ingen oppgaver registrert
            </Alert>
        );
    }
    const sortedOppgaver = [...oppgaver].sort(
        (a, b) => new Date(b.opprettetDato).getTime() - new Date(a.opprettetDato).getTime(),
    );

    return (
        <Table zebraStripes={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Opprettet</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Svarfrist</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortedOppgaver.map((oppgave, index) => (
                    <Table.ExpandableRow
                        key={index}
                        content={
                            <>
                                <OppgaveInfo oppgave={oppgave} />
                            </>
                        }>
                        <Table.DataCell>
                            {dateFormatter.compact(oppgave.opprettetDato)}{' '}
                            {dayjs(oppgave.opprettetDato).format('HH:MM')}
                        </Table.DataCell>
                        <Table.DataCell>{oppgave.oppgavetype}</Table.DataCell>
                        <Table.DataCell>
                            {oppgave.svarfrist ? dateFormatter.compact(oppgave.svarfrist) : 'ikke satt'}
                        </Table.DataCell>
                        <Table.DataCell>{oppgave.status}</Table.DataCell>
                    </Table.ExpandableRow>
                ))}
            </Table.Body>
        </Table>
    );
};

export default OppgaveTabell;
