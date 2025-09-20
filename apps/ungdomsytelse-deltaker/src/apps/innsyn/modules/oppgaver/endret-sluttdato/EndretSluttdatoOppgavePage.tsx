import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { AppText, useAppIntl } from '@shared/i18n';
import { EndretSluttdatoOppgave } from '@shared/types/Oppgave';

import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import EndretSluttdatoOppsummering from './parts/EndretSluttdatoOppsummering';

interface Props {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretSluttdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    if (!oppgave.oppgavetypeData.forrigeSluttdato) {
        throw new Error('Forrige sluttdato mangler for oppgave av typen EndretSluttdatoOppgave');
    }

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <EndretSluttdatoOppgavetekst
                        endretDato={oppgave.oppgavetypeData.nySluttdato}
                        svarfrist={oppgave.frist}
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
        </DefaultPageLayout>
    );
};

export default EndretSluttdatoOppgavePage;
