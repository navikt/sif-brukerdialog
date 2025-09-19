import { useAppIntl } from '../../../../i18n';
import { EndretSluttdatoOppgave } from '../../../../types/Oppgave';
import OppgavebekreftelseV2 from '../../components/oppgavebekreftelse/OppgavebekreftelseV2';
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

export const EndretSluttdatoOppgavePageV2 = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    const sidetittel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.sidetittel');

    const oppgavetittel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel');

    const harTilbakemeldingSpørsmål = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål');

    const tilbakemeldingFritekstLabel = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel');

    const kvitteringTekst = intl.text('oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst');

    return (
        <DefaultPageLayout documentTitle={getDokumentTittel(sidetittel)}>
            <OppgavebekreftelseV2
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                oppgavetittel={oppgavetittel}
                initialVisKvittering={initialVisKvittering}>
                <OppgavebekreftelseV2.Ubesvart
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
                </OppgavebekreftelseV2.Ubesvart>

                <OppgavebekreftelseV2.Besvart spørsmål={harTilbakemeldingSpørsmål}>
                    <EndretSluttdatoOppsummering oppgave={oppgave} />
                </OppgavebekreftelseV2.Besvart>

                <OppgavebekreftelseV2.Kvittering>{kvitteringTekst}</OppgavebekreftelseV2.Kvittering>
            </OppgavebekreftelseV2>
        </DefaultPageLayout>
    );
};
