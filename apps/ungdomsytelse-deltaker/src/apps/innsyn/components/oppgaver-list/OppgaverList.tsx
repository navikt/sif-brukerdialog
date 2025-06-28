import { VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { useAppIntl } from '../../../../i18n';
import { Oppgave } from '../../../../types/Oppgave';
import { getOppgaveInfo, getOppgaveStatusText, getOppgaveTittel } from '../../utils/textUtils';
import OppgaveLinkPanel from '../oppgave-link-panel/OppgaveLinkPanel';
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
        <VStack gap="4">
            {oppgaver.map((oppgave, index) => (
                <OppgaveLinkPanel
                    key={index}
                    beskrivelse={visBeskrivelse ? getOppgaveInfo(oppgave, intl) : undefined}
                    tittel={getOppgaveTittel(oppgave, intl)}
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
