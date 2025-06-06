import { Heading, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from '../oppgaver/parts/OppgaveUttalelse';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../forside-lenke-button/ForsideLenkeButton';
import { OppgavebekreftelseTekster } from './Oppgavebekreftelse';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';
import AvbruttOppgaveInfo from '../avbrutt-oppgave-info/AvbruttOppgaveInfo';
import OppgaveStatusTag from '../oppgave-status-tag/OppgaveStatusTag';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    bekreftelse?: BekreftelseDto;
    oppsummering: React.ReactNode;
    oppgave: Oppgave | BekreftelseOppgave;
}

const LøstOppgavebekreftelse = ({ tekster, bekreftelse, oppsummering, oppgave }: Props) => {
    return (
        <VStack gap="6">
            <div>
                <OppgaveStatusTag oppgave={oppgave} iconFill={false} />
            </div>
            <Heading level="1" size="large">
                {tekster.sidetittel}
            </Heading>

            {bekreftelse && (
                <OppgaveUttalelse
                    beskjedFraNav={oppsummering}
                    spørsmål={tekster.harTilbakemeldingSpørsmål}
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
