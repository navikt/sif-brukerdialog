import { FjernetPeriodeOppgave } from '@sif/api/ung-brukerdialog';

import { AppText, useAppIntl } from '../../../../i18n';
import InnsynPage from '../../../components/innsyn-page/InnsynPage';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import FjernetPeriodeOppgavetekst from './parts/FjernetPeriodeOppgavetekst';
import FjernetPeriodeOppsummering from './parts/FjernetPeriodeOppsummering';

interface Props {
    navn: string;
    oppgave: FjernetPeriodeOppgave;
    initialVisKvittering?: boolean;
}

const FjernetPeriodeOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <InnsynPage documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <FjernetPeriodeOppgavetekst svarfrist={oppgave.sisteDatoEnKanSvare} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <FjernetPeriodeOppsummering />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_FJERNET_PERIODE.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </InnsynPage>
    );
};

export default FjernetPeriodeOppgavePage;
