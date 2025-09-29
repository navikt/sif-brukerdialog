import './oppgaveLinkPanel.css';

import OppgaveStatusIkon from '@innsyn/atoms/oppgave-status-ikon/OppgaveStatusIkon';
import OppgaveStatusTag, { OppgaveStatusTagVariant } from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import { Box, Heading, HGrid, LinkPanel, Show, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export interface OppgaveLinkPanelProps {
    tittel: React.ReactNode;
    beskrivelse?: React.ReactNode;
    oppgaveStatus: OppgaveStatus;
    oppgaveStatusTekst: string;
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;
    onClick: () => void;
}

const OppgaveLinkPanel = ({
    tittel,
    beskrivelse,
    oppgaveStatus,
    oppgaveStatusTekst,
    oppgaveStatusTagVariant = 'tag-uten-ikon',
    onClick,
}: OppgaveLinkPanelProps) => {
    const erAvbruttEllerUtløpt = oppgaveStatus === OppgaveStatus.AVBRUTT || oppgaveStatus === OppgaveStatus.UTLØPT;
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
                        <OppgaveStatusIkon oppgavestatus={oppgaveStatus} />
                    </Box>
                </Show>
                <VStack gap="1">
                    <Heading level="3" size="small">
                        {tittel}
                    </Heading>
                    {beskrivelse && <Box marginBlock="0 1">{beskrivelse}</Box>}
                    <div>
                        <OppgaveStatusTag
                            oppgaveStatus={oppgaveStatus}
                            oppgaveStatusTekst={oppgaveStatusTekst}
                            variant={oppgaveStatusTagVariant}
                            size="small"
                        />
                    </div>
                </VStack>
            </HGrid>
        </LinkPanel>
    );
};

export default OppgaveLinkPanel;
