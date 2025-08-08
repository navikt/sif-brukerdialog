import { Alert, Heading, VStack } from '@navikt/ds-react';
import { BekreftelseDto, OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { OppgaveBase } from '../../../../../types/Oppgave';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import OppgaveStatusInfo from '../../oppgave-status-info/OppgaveStatusInfo';
import OppgaveStatusTag from '../../oppgave-status-tag/OppgaveStatusTag';
import { OppgavebekreftelseTekster } from '../types';
import OppgaveUttalelse from './OppgaveUttalelse';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    bekreftelse?: BekreftelseDto;
    oppsummering: React.ReactNode;
    oppgave: OppgaveBase;
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

            {/* Kan oppstå hvis bruker går direkte inn på en besvart oppgave etter å ha send inn svar */}
            {oppgave.status === OppgaveStatus.LØST && !bekreftelse ? (
                <Alert variant="info">Informasjon om hva du svarte er ikke tilgjengelig enda.</Alert>
            ) : null}

            <OppgaveStatusInfo oppgaveStatus={oppgave.status} />

            <div>
                <ForsideLenkeButton />
            </div>
        </VStack>
    );
};

export default LøstOppgavebekreftelse;
