import { BodyShort, ExpansionCard, Heading, HStack, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from '../oppgaver/parts/OppgaveUttalelse';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import { OppgavebekreftelseTekster } from './Oppgavebekreftelse';
import OppgaveMeta from '../oppgave-meta/OppgaveMeta';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';
import AvbruttOppgaveInfo from '../avbrutt-oppgave-info/AvbruttOppgaveInfo';

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
                    <ExpansionCard.Title>
                        <VStack gap="2">
                            <div>
                                <OppgaveStatusTag status={oppgave.status} />
                            </div>
                            <div>Oppgaveinformasjon</div>
                        </VStack>
                    </ExpansionCard.Title>
                    <ExpansionCard.Description>
                        <HStack paddingBlock="2 0" gap="2">
                            <BodyShort>{oppsummering}</BodyShort>
                        </HStack>
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

            {bekreftelse && (
                <OppgaveUttalelse
                    godtarSpørsmål="Forstår og godtar du at startdatoen din er endret"
                    bekreftelse={bekreftelse}
                />
            )}
            {oppgave.status !== OppgaveStatus.LØST && <AvbruttOppgaveInfo oppgave={oppgave} />}

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default LøstOppgavebekreftelse;
