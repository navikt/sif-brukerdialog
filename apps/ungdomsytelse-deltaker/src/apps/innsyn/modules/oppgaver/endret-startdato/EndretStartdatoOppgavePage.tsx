import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { EndretStartdatoOppgave } from '@shared/types/Oppgave';

import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretStartdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();
    const formatertDato = (
        <span className="text-nowrap">{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}</span>
    );

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <EndretStartdatoOppgavetekst
                        frist={oppgave.sisteDatoEnKanSvare}
                        startdato={oppgave.oppgavetypeData.nyStartdato}
                    />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <AppText
                        id="endretStartdato.oppsummering"
                        values={{ formatertDato, strong: (content) => <strong>{content}</strong> }}
                    />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default EndretStartdatoOppgavePage;
