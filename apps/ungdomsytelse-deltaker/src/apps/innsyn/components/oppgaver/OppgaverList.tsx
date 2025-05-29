import { VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import OppgaveLinkPanel from './OppgaveLinkPanel';
import { getOppgaveBeskrivelse, getOppgaveTittel } from '../../utils/textUtils';
import { useAppIntl } from '../../i18n';

interface Props {
    oppgaver: Oppgave[];
    programPeriode: OpenDateRange;
    deltakelseId: string;
}

const OppgaverList = ({ oppgaver }: Props) => {
    const navigate = useNavigate();
    const intl = useAppIntl();

    return (
        <VStack gap="4">
            {oppgaver.map((oppgave, index) => (
                <OppgaveLinkPanel
                    key={index}
                    beskrivelse={getOppgaveBeskrivelse(oppgave)}
                    tittel={getOppgaveTittel(oppgave, intl)}
                    status={oppgave.status}
                    svarfrist={oppgave.svarfrist}
                    løstDato={oppgave.løstDato}
                    onClick={() => {
                        navigate(`/oppgave/${oppgave.oppgaveReferanse}`);
                    }}
                />
            ))}
        </VStack>
    );
};

export default OppgaverList;
