import { ExpansionCard, VStack } from '@navikt/ds-react';

interface Props {
    oppsummering?: React.ReactNode;
    children: React.ReactNode;
}

const BesvartOppgaveExpansionCart = ({ oppsummering, children }: Props) => (
    <ExpansionCard aria-label="Beskjed fra Nav" size="small">
        <ExpansionCard.Header>
            <ExpansionCard.Title>
                <VStack gap="2">
                    <div>Beskjed fra Nav</div>
                </VStack>
            </ExpansionCard.Title>
            {oppsummering && <ExpansionCard.Description>{oppsummering}</ExpansionCard.Description>}
        </ExpansionCard.Header>
        <ExpansionCard.Content>
            <VStack gap="4">{children}</VStack>
        </ExpansionCard.Content>
    </ExpansionCard>
);

export default BesvartOppgaveExpansionCart;
