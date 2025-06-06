import { Box, Heading, HGrid, LinkPanel, Show, VStack } from '@navikt/ds-react';
import { BekreftelseOppgave, Oppgave, OppgaveStatus } from '@navikt/ung-common';
import OppgaveStatusIkon from '../oppgave-status-ikon/OppgaveStatusIkon';
import OppgaveStatusTag, { OppgaveStatusTagVariant } from '../oppgave-status-tag/OppgaveStatusTag';
import './oppgaveLinkPanel.css';

interface Props {
    tittel: string;
    beskrivelse?: React.ReactNode;
    oppgave: Oppgave | BekreftelseOppgave;
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;
    onClick: () => void;
}

const OppgaveLinkPanel = ({ tittel, beskrivelse, oppgave, oppgaveStatusTagVariant = 'tag', onClick }: Props) => {
    const erAvbruttEllerUtløpt = oppgave.status === OppgaveStatus.AVBRUTT || oppgave.status === OppgaveStatus.UTLØPT;
    return (
        <LinkPanel
            href="#"
            className={`w-full oppgaveLinkPanel ${erAvbruttEllerUtløpt ? ' oppgaveLinkPanel--avbrutt' : ''}`}
            border={false}
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            <HGrid columns={{ sm: '3rem auto' }} gap="2" className="w-full" align="center">
                <Show above="sm">
                    <Box paddingInline="2 3">
                        <OppgaveStatusIkon oppgavestatus={oppgave.status} />
                    </Box>
                </Show>
                <VStack gap="1">
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    {beskrivelse && <Box marginBlock="0 1">{beskrivelse}</Box>}
                    <div>
                        <OppgaveStatusTag oppgave={oppgave} size="small" variant={oppgaveStatusTagVariant} />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
