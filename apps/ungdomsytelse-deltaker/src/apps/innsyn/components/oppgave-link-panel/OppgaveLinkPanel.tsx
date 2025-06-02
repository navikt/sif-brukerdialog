import { CheckmarkCircleFillIcon, CircleSlashFillIcon, PencilFillIcon } from '@navikt/aksel-icons';
import { Box, Heading, HGrid, LinkPanel, Show, VStack } from '@navikt/ds-react';
import { BekreftelseOppgave, Oppgave, OppgaveStatus } from '@navikt/ung-common';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';

interface Props {
    tittel: string;
    beskrivelse?: React.ReactNode;
    oppgave: Oppgave | BekreftelseOppgave;
    onClick: () => void;
}

const OppgaveStatusIcon = ({ oppgavestatus }: { oppgavestatus: OppgaveStatus }) => {
    switch (oppgavestatus) {
        case OppgaveStatus.ULØST:
            return <PencilFillIcon fill="red" color="#C95100" width="1.8rem" height="1.8rem" aria-label="Penn-ikon" />;
        case OppgaveStatus.LUKKET:
        case OppgaveStatus.LØST:
            return (
                <CheckmarkCircleFillIcon
                    fill="red"
                    color="#00893c"
                    width="1.8rem"
                    height="1.8rem"
                    aria-label="Gjennomført ikon"
                />
            );
        case OppgaveStatus.UTLØPT:
        case OppgaveStatus.AVBRUTT:
            return (
                <CircleSlashFillIcon
                    fill="red"
                    color="#49515e"
                    width="1.8rem"
                    height="1.8rem"
                    aria-label="Gjennomført ikon"
                />
            );
    }
};

const OppgaveLinkPanel = ({ tittel, beskrivelse, oppgave, onClick }: Props) => {
    return (
        <LinkPanel
            href="#"
            className="w-full"
            border={false}
            style={{ borderRadius: '0.5rem' }}
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            <HGrid columns={{ sm: '3rem auto' }} gap="2" className="w-full" align="center">
                <Show above="sm">
                    <Box paddingInline="2 3">
                        <OppgaveStatusIcon oppgavestatus={oppgave.status} />
                    </Box>
                </Show>
                <VStack gap="1">
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    {beskrivelse && <Box marginBlock="0 1">{beskrivelse}</Box>}
                    <div>
                        <OppgaveStatusTag oppgave={oppgave} />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
