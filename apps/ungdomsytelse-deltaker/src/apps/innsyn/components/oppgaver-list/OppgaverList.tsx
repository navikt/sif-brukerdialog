import { VStack } from '@navikt/ds-react';
import { Oppgave } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import OppgaveLinkPanel from '../oppgave-link-panel/OppgaveLinkPanel';
import { getOppgaveBeskrivelse, getOppgaveTittel } from '../../utils/textUtils';
import { useAppIntl } from '../../../../i18n';
import { OppgaveStatusTagVariant } from '../oppgave-status-tag/OppgaveStatusTag';

interface Props {
    oppgaver: Oppgave[];
    oppgaveStatusTagVariant?: OppgaveStatusTagVariant;
}

const OppgaverList = ({ oppgaver, oppgaveStatusTagVariant }: Props) => {
    const navigate = useNavigate();
    const intl = useAppIntl();

    return (
        <VStack gap="4">
            {oppgaver.map((oppgave, index) => (
                <OppgaveLinkPanel
                    key={index}
                    oppgaveStatusTagVariant={oppgaveStatusTagVariant}
                    beskrivelse={getOppgaveBeskrivelse(oppgave)}
                    tittel={getOppgaveTittel(oppgave, intl)}
                    oppgave={oppgave}
                    onClick={() => {
                        navigate(`/oppgave/${oppgave.oppgaveReferanse}`);
                    }}
                />
            ))}
        </VStack>
    );
};

export default OppgaverList;
