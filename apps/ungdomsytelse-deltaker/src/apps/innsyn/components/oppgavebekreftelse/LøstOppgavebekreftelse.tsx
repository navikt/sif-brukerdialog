import { BodyShort, Box, ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from '../oppgaver/parts/OppgaveUttalelse';
import { BekreftelseDto } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import { OppgavebekreftelseTekster } from './Oppgavebekreftelse';
import OppgaveMeta from '../oppgave-meta/OppgaveMeta';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    bekreftelse?: BekreftelseDto;
    oppsummering: React.ReactNode;
    oppgave: Oppgave | BekreftelseOppgave;
    children: React.ReactNode;
}

const LøstOppgavebekreftelse = ({ tekster, deltakerNavn, bekreftelse, oppsummering, oppgave, children }: Props) => {
    return (
        <VStack gap="6">
            <Heading level="1" size="large">
                {tekster.tittel}
            </Heading>
            <ExpansionCard aria-label="Beskjed fra Nav" size="small">
                <ExpansionCard.Header>
                    <ExpansionCard.Title>Oppgaveinformasjon</ExpansionCard.Title>
                    <ExpansionCard.Description>
                        <Box paddingBlock="2 0">
                            <BodyShort>{oppsummering}</BodyShort>
                        </Box>
                    </ExpansionCard.Description>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="4">
                        <Heading level="3" size="small">
                            Hei {deltakerNavn}
                        </Heading>
                        <div>{children}</div>
                        <OppgaveMeta oppgave={oppgave} />
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>

            {bekreftelse ? (
                <OppgaveUttalelse
                    godtarSpørsmål="Forstår og godtar du at startdatoen din er endret"
                    bekreftelse={bekreftelse}
                />
            ) : (
                <>Informasjon om bekreftelse mangler</>
            )}

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default LøstOppgavebekreftelse;
