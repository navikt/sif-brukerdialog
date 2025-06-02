import { Alert, VStack } from '@navikt/ds-react';
import { OpenDateRange } from '@navikt/sif-common-utils';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import { useNavigate } from 'react-router-dom';
import OppgaveLinkPanel from '../oppgave-link-panel/OppgaveLinkPanel';
import { getOppgaveBeskrivelse, getOppgaveOppsummering, getOppgaveTittel } from '../../utils/textUtils';
import SøknadMottattOppgavePanel from '../oppgaver/søknad-mottatt-oppgave/SøknadMottattOppgavePanel';
import { useAppIntl } from '../../../../i18n';

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
            {oppgaver.map((oppgave, index) => {
                if (oppgave.ugyldigOppgave) {
                    return (
                        <Alert variant="error" key={index}>
                            <div>{getOppgaveOppsummering(oppgave)}</div>
                        </Alert>
                    );
                }
                return oppgave.oppgavetype === Oppgavetype.SØK_YTELSE ? (
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
                );
            })}
        </VStack>
    );
};

export default OppgaverList;
