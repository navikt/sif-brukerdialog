import { EndretSluttdatoOppgave } from '@sif/api/ung-brukerdialog';

import { AppText } from '../../../../i18n';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import EndretSluttdatoOppsummering from './parts/EndretSluttdatoOppsummering';

interface Props {
    navn: string;
    oppgave: EndretSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretSluttdatoOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    if (!oppgave.oppgavetypeData.forrigeSluttdato) {
        throw new Error('Forrige sluttdato mangler for oppgave av typen EndretSluttdatoOppgave');
    }

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <EndretSluttdatoOppgavetekst
                    endretDato={oppgave.oppgavetypeData.nySluttdato}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
                />
            </Oppgavebekreftelse.Ubesvart>
            <Oppgavebekreftelse.Besvart>
                <EndretSluttdatoOppsummering
                    forrigeSluttdato={oppgave.oppgavetypeData.forrigeSluttdato}
                    nySluttdato={oppgave.oppgavetypeData.nySluttdato}
                />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <AppText id="oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};

export default EndretSluttdatoOppgavePage;
