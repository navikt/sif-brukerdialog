import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { AppText, useAppIntl } from '@shared/i18n';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { FjernetPeriodeOppgave } from '@shared/types/Oppgave';

import FjernetPeriodeOppgavetekst from './parts/FjernetPeriodeOppgavetekst';
import FjernetPeriodeOppsummering from './parts/FjernetPeriodeOppsummering';

interface Props {
    deltakerNavn: string;
    oppgave: FjernetPeriodeOppgave;
    initialVisKvittering?: boolean;
}

const FjernetPeriodeOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <FjernetPeriodeOppgavetekst svarfrist={oppgave.sisteDatoEnKanSvare} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <FjernetPeriodeOppsummering />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default FjernetPeriodeOppgavePage;
