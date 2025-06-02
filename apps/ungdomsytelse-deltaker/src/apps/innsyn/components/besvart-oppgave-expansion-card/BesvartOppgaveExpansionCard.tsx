import { BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import { OppgaveStatus } from '@navikt/ung-common';

interface Props {
    oppgavestatus: OppgaveStatus;
    oppsummering?: React.ReactNode;
    children: React.ReactNode;
}

const BesvartOppgaveExpansionCart = ({ oppgavestatus, oppsummering, children }: Props) => (
    <ExpansionCard aria-label="Beskjed fra Nav" size="small">
        <ExpansionCard.Header>
            <ExpansionCard.Title>Oppgaveinformasjon</ExpansionCard.Title>
            {oppsummering && (
                <ExpansionCard.Description>
                    <HStack paddingBlock="2 0" gap="2">
                        <OppgaveStatusTag status={oppgavestatus} /> <BodyShort>{oppsummering}</BodyShort>
                    </HStack>
                </ExpansionCard.Description>
            )}
        </ExpansionCard.Header>
        <ExpansionCard.Content>
            <VStack gap="4">{children}</VStack>
        </ExpansionCard.Content>
    </ExpansionCard>
);

export default BesvartOppgaveExpansionCart;
