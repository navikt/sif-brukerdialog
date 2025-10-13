import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { AppText, useAppIntl } from '@shared/i18n';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { EndretSluttdatoOppgave } from '@shared/types/Oppgave';

import MeldtUtOppsummering from './parts/MeldtUtOppsummering';
import MeldUtOppgavetekst from './parts/MeldUtOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const MeldtUtOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <MeldUtOppgavetekst endretDato={oppgave.oppgavetypeData.nySluttdato} svarfrist={oppgave.frist} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <MeldtUtOppsummering sluttdato={oppgave.oppgavetypeData.nySluttdato} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default MeldtUtOppgavePage;
