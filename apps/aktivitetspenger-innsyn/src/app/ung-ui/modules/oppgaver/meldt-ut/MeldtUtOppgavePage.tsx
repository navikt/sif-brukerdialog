import { MeldtUtOppgave } from '@sif/api/ung-brukerdialog';

import { AppText, useAppIntl } from '../../../../i18n';
import InnsynPage from '../../../components/innsyn-page/InnsynPage';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import MeldtUtOppsummering from './parts/MeldtUtOppsummering';
import MeldUtOppgavetekst from './parts/MeldUtOppgavetekst';

interface Props {
    navn: string;
    oppgave: MeldtUtOppgave;
    initialVisKvittering?: boolean;
}

const MeldtUtOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <InnsynPage documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <MeldUtOppgavetekst
                        sluttdato={oppgave.oppgavetypeData.sluttdato}
                        svarfrist={oppgave.sisteDatoEnKanSvare}
                    />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <MeldtUtOppsummering sluttdato={oppgave.oppgavetypeData.sluttdato} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </InnsynPage>
    );
};

export default MeldtUtOppgavePage;
