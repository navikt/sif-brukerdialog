import { Box, List, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Oppgave, Oppgavestatus, Oppgavetype } from '@navikt/ung-common';

interface Props {
    oppgaver: Oppgave[];
}

const renderOppgaveCommonInfo = (oppgave: Oppgave) => {
    return (
        <>
            <Box>Opprettet: {dateFormatter.compact(oppgave.opprettetDato)}</Box>
            <Box>Status: {oppgave.status}</Box>
            <Box>Svarfrist: {oppgave.svarfrist ? dateFormatter.compact(oppgave.svarfrist) : 'Ikke satt'}</Box>
            {oppgave.status === Oppgavestatus.LØST && oppgave.løstDato && (
                <Box>Løst: {dateFormatter.compact(oppgave.opprettetDato)}</Box>
            )}
        </>
    );
};

const OppgaveInfo = ({ oppgave }: { oppgave: Oppgave }) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return (
                <VStack gap="0">
                    <Box>Startdato endret til: TODO</Box>
                    {renderOppgaveCommonInfo(oppgave)}
                </VStack>
            );
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return (
                <VStack gap="0">
                    <Box>Sluttdato endret til: TODO</Box>
                    {renderOppgaveCommonInfo(oppgave)}
                </VStack>
            );
    }
};

const DeltakelseOppgaveliste = ({ oppgaver }: Props) => {
    const getOppgaveListItemTittel = (oppgave: Oppgave): string => {
        switch (oppgave.oppgavetype) {
            case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
                return 'Bekrefte endret startdato';
            case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
                return 'Bekrefte endret sluttdato';
        }
    };
    return (
        <List size="small">
            {oppgaver.map((oppgave, index) => {
                return (
                    <List.Item title={getOppgaveListItemTittel(oppgave)} key={index}>
                        <OppgaveInfo oppgave={oppgave} />
                    </List.Item>
                );
            })}
        </List>
    );
};

export default DeltakelseOppgaveliste;
