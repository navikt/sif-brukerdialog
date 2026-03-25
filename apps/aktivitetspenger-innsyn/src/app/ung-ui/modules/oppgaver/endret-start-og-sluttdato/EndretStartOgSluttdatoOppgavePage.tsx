import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartOgSluttdatoOppgave } from '@sif/api';
import { ReactNode } from 'react';

import { AppText, useAppIntl } from '../../../../i18n';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import EndretStartOgSluttdatoOppgavetekst from './parts/EndretStartOgSluttdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartOgSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretStartOgSluttdatoOppgavePage = ({ deltakerNavn: navn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
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
