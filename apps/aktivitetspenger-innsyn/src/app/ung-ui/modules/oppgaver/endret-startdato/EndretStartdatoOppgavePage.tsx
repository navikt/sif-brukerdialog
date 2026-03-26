import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartdatoOppgave } from '@sif/api/ung-brukerdialog';
import { ReactNode } from 'react';

import { AppText } from '../../../../i18n';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';

interface Props {
    navn: string;
    oppgave: EndretStartdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretStartdatoOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const formatertDato = (
        <span className="text-nowrap">{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}</span>
    );

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <EndretStartdatoOppgavetekst
                    frist={oppgave.sisteDatoEnKanSvare}
                    startdato={oppgave.oppgavetypeData.nyStartdato}
                />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <AppText
                    id="endretStartdato.oppsummering"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <AppText id="oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};

export default EndretStartdatoOppgavePage;
