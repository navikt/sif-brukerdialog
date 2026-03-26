import { VStack } from '@navikt/ds-react';
import { Oppgave } from '@sif/api/ung-brukerdialog';
import { useNavigate } from 'react-router-dom';

import { useAppIntl } from '../../../i18n';
import { getOppgaveInfo, getOppgavePanelTittel, getOppgaveStatusText } from '../../utils/textUtils';
import OppgaveLinkCard from '../oppgave-link-card/OppgaveLinkCard';
import { OppgaveStatusTagVariant } from '../oppgave-status-tag/OppgaveStatusTag';

interface Props {
    oppgaver: Oppgave[];
    visBeskrivelse?: boolean;
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;
}

const OppgaverList = ({ oppgaver, oppgaveStatusTagVariant, visBeskrivelse = true }: Props) => {
    const navigate = useNavigate();
    const intl = useAppIntl();

    return (
        <VStack gap="space-16">
            {oppgaver.map((oppgave) => (
                <OppgaveLinkCard
                    key={oppgave.oppgaveReferanse}
                    beskrivelse={visBeskrivelse ? getOppgaveInfo(oppgave, intl) : undefined}
                    tittel={getOppgavePanelTittel(oppgave, intl)}
                    oppgaveStatus={oppgave.status}
                    oppgaveStatusTekst={getOppgaveStatusText(oppgave)}
                    oppgaveStatusTagVariant={oppgaveStatusTagVariant}
                    onClick={() => {
                        navigate(`oppgave/${oppgave.oppgaveReferanse}`);
                    }}
                />
            ))}
        </VStack>
    );
};

export default OppgaverList;
