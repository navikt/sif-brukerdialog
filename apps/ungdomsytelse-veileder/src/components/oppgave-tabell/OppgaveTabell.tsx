import { Alert, Box, Heading, HGrid, List, Table, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import { Oppgavetype } from '@navikt/ung-deltakelse-opplyser-api';
import dayjs from 'dayjs';
import Melding from '../melding/Melding';

interface Props {
    oppgaver: Oppgave[];
}

export const OppgaveInfo = ({ oppgave }: { oppgave: Oppgave }) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            const { meldingFraVeileder = 'Hei, jeg endrer startdatoen som avtalt i møtet vårt.', nyStartdato } =
                oppgave.oppgavetypeData;
            const { veilederRef } = oppgave.oppgavetypeData;
            return (
                <HGrid columns="1fr 1fr" gap="10">
                    <VStack>
                        <Heading level="3" size="small">
                            Innhold
                        </Heading>
                        <List>
                            <List.Item>Startdato endret til: {dateFormatter.compact(nyStartdato)}</List.Item>
                            <List.Item>
                                <VStack gap="2" marginBlock={'0 4'}>
                                    <Box>Melding til bruker: </Box>
                                    {meldingFraVeileder ? (
                                        <Melding tekst={meldingFraVeileder} avsender={veilederRef} />
                                    ) : (
                                        'Ingen melding'
                                    )}
                                </VStack>
                            </List.Item>
                        </List>
                        <Heading level="3" size="small">
                            Respons fra deltaker
                        </Heading>
                        <List>
                            <List.Item>Deltaker har ikke åpnet oppgaven</List.Item>
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
                            {/* <List.Item>Åpnet av deltaker: {oppgave.åpnetAvDeltaker ? 'Ja' : 'Nei'}</List.Item> */}
                            {/* {oppgave.løstDato && oppgave.løsningstype ? (
                                <>
                                    <List.Item>Løst: Ja</List.Item>
                                    <List.Item>Løsningstype: {oppgave.løsningstype}</List.Item>
                                </>
                            ) : null} */}
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
    return (
        <Table zebraStripes={true}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Opprettet</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Svarfrist</Table.HeaderCell>
                    <Table.HeaderCell>Åpnet</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {oppgaver.map((oppgave, index) => (
                    <Table.ExpandableRow
                        key={index}
                        content={
                            <>
                                <OppgaveInfo oppgave={oppgave} />
                            </>
                        }>
                        <Table.DataCell>
                            {dateFormatter.compact(oppgave.opprettetDato)} -
                            {dayjs(oppgave.opprettetDato).format('HH:MM')}
                        </Table.DataCell>
                        <Table.DataCell>{oppgave.oppgavetype}</Table.DataCell>
                        <Table.DataCell>
                            {/* {oppgave.svarfrist ? dateFormatter.compact(oppgave.svarfrist) : 'ikke satt'} */}
                        </Table.DataCell>
                        {/* <Table.DataCell>{oppgave.åpnetAvDeltaker ? 'Ja' : 'Nei'}</Table.DataCell> */}
                        <Table.DataCell>{oppgave.status}</Table.DataCell>
                    </Table.ExpandableRow>
                ))}
            </Table.Body>
        </Table>
    );
};

export default OppgaveTabell;
