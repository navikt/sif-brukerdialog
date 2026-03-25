import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartdatoOppgave } from '@sif/api';
import { ReactNode } from 'react';

import { AppText, useAppIntl } from '../../../../i18n';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';

interface Props {
    navn: string;
    oppgave: EndretStartdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretStartdatoOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();
    const formatertDato = (
        <span className="text-nowrap">{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}</span>
    );

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
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
        </DefaultPageLayout>
    );
};

export default EndretStartdatoOppgavePage;
