import { Heading, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from '../oppgaver/parts/OppgaveUttalelse';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import { OppgavebekreftelseTekster } from './Oppgavebekreftelse';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';
import AvbruttOppgaveInfo from '../avbrutt-oppgave-info/AvbruttOppgaveInfo';
import BesvartOppgaveExpansionCart from '../besvart-oppgave-expansion-card/BesvartOppgaveExpansionCard';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';

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
            <OppgaveStatusTag oppgave={oppgave} />
            <Heading level="1" size="large">
                {tekster.tittel}
            </Heading>

            <BesvartOppgaveExpansionCart oppsummering={oppsummering}>
                <VStack gap="4">
                    <Heading level="3" size="small">
                        Hei {deltakerNavn}
                    </Heading>
                    <div>{children}</div>
                </VStack>
            </BesvartOppgaveExpansionCart>

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
