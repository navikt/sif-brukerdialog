import { OppgaveStatusTagVariant } from '@innsyn/atoms/oppgave-status-tag/OppgaveStatusTag';
import OppgaveLinkPanel from '@innsyn/components/oppgave-link-panel/OppgaveLinkPanel';
import { getOppgaveInfo, getOppgavePanelTittel, getOppgaveStatusText } from '@innsyn/utils/textUtils';
import { VStack } from '@navikt/ds-react';
import { useAppIntl } from '@shared/i18n';
import { Oppgave } from '@shared/types/Oppgave';
import { useNavigate } from 'react-router-dom';

interface Props {
    oppgaver: Oppgave[];
    visBeskrivelse?: boolean;
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;
}

const OppgaverList = ({ oppgaver, oppgaveStatusTagVariant, visBeskrivelse = true }: Props) => {
    const navigate = useNavigate();
    const intl = useAppIntl();

    return (
        <VStack gap="4">
            {oppgaver.map((oppgave) => (
                <OppgaveLinkPanel
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
