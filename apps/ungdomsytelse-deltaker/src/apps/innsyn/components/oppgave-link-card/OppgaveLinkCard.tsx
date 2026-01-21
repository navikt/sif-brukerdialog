import './oppgaveLinkCard.css';

import OppgaveStatusIkon from '@innsyn/atoms/oppgave-status-ikon/OppgaveStatusIkon';
import OppgaveStatusTag, { OppgaveStatusTagVariant } from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import { Box, LinkCard, Show, VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export interface oppgaveLinkCardProps {
    tittel: React.ReactNode;
    beskrivelse?: React.ReactNode;
    oppgaveStatus: OppgaveStatus;
    oppgaveStatusTekst: string;
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;

    onClick: () => void;
}

const OppgaveLinkCard = ({
    tittel,
    beskrivelse,
    oppgaveStatus,
    oppgaveStatusTekst,
    oppgaveStatusTagVariant = 'tag-uten-ikon',
    onClick,
}: oppgaveLinkCardProps) => {
    const erAvbruttEllerUtløpt = oppgaveStatus === OppgaveStatus.AVBRUTT || oppgaveStatus === OppgaveStatus.UTLØPT;
    return (
        <LinkCard
            className={`w-full oppgaveLinkCard ${erAvbruttEllerUtløpt ? ' oppgaveLinkCard--avbrutt' : ''}`}
            onClick={(evt) => {
                evt.stopPropagation();
                evt.preventDefault();
                onClick();
            }}>
            <Show above="sm" asChild>
                <LinkCard.Icon>
                    <OppgaveStatusIkon oppgavestatus={oppgaveStatus} />
                </LinkCard.Icon>
            </Show>
            <LinkCard.Title>
                <LinkCard.Anchor href="#">{tittel}</LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                <VStack gap="space-4">
                    {beskrivelse && <Box marginBlock="space-0 space-4">{beskrivelse}</Box>}
                    <div>
                        <OppgaveStatusTag
                            oppgaveStatus={oppgaveStatus}
                            oppgaveStatusTekst={oppgaveStatusTekst}
                            variant={oppgaveStatusTagVariant}
                            size="small"
                        />
                    </div>
                </VStack>
            </LinkCard.Description>
        </LinkCard>
    );
};

export default OppgaveLinkCard;
