import { useAppIntl } from '../../../../i18n';
import { EndretSluttdatoOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '../../utils/textUtils';
import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import EndretSluttdatoOppsummering from './parts/EndretSluttdatoOppsummering';
import NySluttdatoOppgavetekst from './parts/NySluttdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

export const EndretSluttdatoOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    const sidetittel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.sidetittel');

    const oppgavetittel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel');

    const harTilbakemeldingSpørsmål = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål');

    const tilbakemeldingFritekstLabel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel');

    const kvitteringTekst = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst');

    return (
        <DefaultPageLayout documentTitle={getDokumentTittel(sidetittel)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                oppgavetittel={oppgavetittel}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart
                    spørsmål={harTilbakemeldingSpørsmål}
                    tilbakemeldingLabel={tilbakemeldingFritekstLabel}>
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

                <Oppgavebekreftelse.Besvart spørsmål={harTilbakemeldingSpørsmål}>
                    <EndretSluttdatoOppsummering oppgave={oppgave} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>{kvitteringTekst}</Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
