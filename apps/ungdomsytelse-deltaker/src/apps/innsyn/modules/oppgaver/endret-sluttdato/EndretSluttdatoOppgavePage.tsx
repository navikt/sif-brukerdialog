import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '@innsyn/utils/textUtils';
import { useAppIntl } from '@shared/i18n';
import { EndretSluttdatoOppgave } from '@shared/types/Oppgave';

import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import EndretSluttdatoOppsummering from './parts/EndretSluttdatoOppsummering';
import NySluttdatoOppgavetekst from './parts/NySluttdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

const EndretSluttdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    return (
        <DefaultPageLayout
            documentTitle={getDokumentTittel(intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.sidetittel'))}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                oppgavetittel={intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel')}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart
                    spørsmål={intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål')}
                    tilbakemeldingLabel={intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel')}>
                    {oppgave.oppgavetypeData.forrigeSluttdato ? (
                        <EndretSluttdatoOppgavetekst
                            endretDato={oppgave.oppgavetypeData.nySluttdato}
                            svarfrist={oppgave.frist}
                        />
                    ) : (
                        <NySluttdatoOppgavetekst
                            endretDato={oppgave.oppgavetypeData.nySluttdato}
                            svarfrist={oppgave.frist}
                        />
                    )}
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart
                    spørsmål={intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål')}>
                    <EndretSluttdatoOppsummering oppgave={oppgave} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    {intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst')}
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default EndretSluttdatoOppgavePage;
