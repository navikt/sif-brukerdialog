import { Heading, VStack } from '@navikt/ds-react';
import OppgaveUttalelse from './OppgaveUttalelse';
import { BekreftelseDto } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import { OppgavebekreftelseTekster } from '../Oppgavebekreftelse';
import { BekreftelseOppgave, Oppgave } from '@navikt/ung-common';
import LøstOppgavebekreftelseInfo from './LøstOppgavebekreftelseInfo';
import OppgaveStatusTag from '../../oppgave-status-tag/OppgaveStatusTag';
import { getOppgaveStatusText } from '../../../utils/getOppgaveStatusText';

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
                <OppgaveStatusTag
                    oppgaveStatus={oppgave.status}
                    oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    iconFill={false}
                />
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
            <LøstOppgavebekreftelseInfo oppgaveStatus={oppgave.status} />
            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default LøstOppgavebekreftelse;
