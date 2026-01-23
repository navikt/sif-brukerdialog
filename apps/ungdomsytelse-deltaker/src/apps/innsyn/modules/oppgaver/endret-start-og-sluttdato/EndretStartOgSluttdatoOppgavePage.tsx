import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { EndretStartOgSluttdatoOppgave } from '@shared/types/Oppgave';
import { ReactNode } from 'react';

import EndretStartOgSluttdatoOppgavetekst from './parts/EndretStartOgSluttdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartOgSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretStartOgSluttdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <EndretStartOgSluttdatoOppgavetekst
                        frist={oppgave.sisteDatoEnKanSvare}
                        nyPeriode={oppgave.oppgavetypeData.nyPeriode}
                    />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <AppText
                        id="endretStartOgSluttdato.oppsummering"
                        values={{
                            fom: dateFormatter.full(oppgave.oppgavetypeData.nyPeriode.from),
                            tom: dateFormatter.full(oppgave.oppgavetypeData.nyPeriode.to),
                            strong: (content: ReactNode) => <strong>{content}</strong>,
                        }}
                    />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText id="oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.kvitteringTekst" />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default EndretStartOgSluttdatoOppgavePage;
