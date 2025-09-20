import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '@innsyn/utils/textUtils';
import { AppText, useAppIntl } from '@shared/i18n';
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
        <DefaultPageLayout documentTitle={getDokumentTittel(intl.text('oppgavetype.BEKREFT_MELDT_UT.sidetittel'))}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                oppgavetittel={intl.text('oppgavetype.BEKREFT_MELDT_UT.oppgavetittel')}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart
                    spørsmål={intl.text('oppgavetype.BEKREFT_MELDT_UT.harTilbakemeldingSpørsmål')}
                    tilbakemeldingLabel={intl.text('oppgavetype.BEKREFT_MELDT_UT.tilbakemeldingFritekstLabel')}>
                    <MeldUtOppgavetekst endretDato={oppgave.oppgavetypeData.nySluttdato} svarfrist={oppgave.frist} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart
                    spørsmål={intl.text('oppgavetype.BEKREFT_MELDT_UT.harTilbakemeldingSpørsmål')}>
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
