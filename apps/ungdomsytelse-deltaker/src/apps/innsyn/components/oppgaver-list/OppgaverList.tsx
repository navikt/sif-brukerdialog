import { VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import OppgaveLinkPanel from '../oppgave-link-panel/OppgaveLinkPanel';
import { getOppgaveBeskrivelse, getOppgaveTittel } from '../../utils/textUtils';
import { useAppIntl } from '../../i18n';
import SøknadMottattOppgavePanel from '../oppgaver/søknad-mottatt-oppgave/SøknadMottattOppgavePanel';

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
            {oppgaver.map((oppgave, index) =>
                oppgave.oppgavetype === Oppgavetype.SEND_SØKNAD ? (
                    <SøknadMottattOppgavePanel key={index} mottatt={oppgave.opprettetDato} />
                ) : (
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
                ),
            )}
        </VStack>
    );
};

export default OppgaverList;
