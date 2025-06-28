import { Alert, Heading, VStack } from '@navikt/ds-react';
import { OppgaveBase, OppgaveStatus } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';
import ForsideLenkeButton from '../../../atoms/forside-lenke-button/ForsideLenkeButton';
import { getOppgaveStatusText } from '../../../utils/textUtils';
import OppgaveStatusInfo from '../../oppgave-status-info/OppgaveStatusInfo';
import OppgaveStatusTag from '../../oppgave-status-tag/OppgaveStatusTag';
import { OppgavebekreftelseTekster } from '../Oppgavebekreftelse';
import OppgaveUttalelse from './OppgaveUttalelse';

interface Props {
    tekster: OppgavebekreftelseTekster;
    deltakerNavn: string;
    bekreftelse?: DeltakerApi.BekreftelseDto;
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
