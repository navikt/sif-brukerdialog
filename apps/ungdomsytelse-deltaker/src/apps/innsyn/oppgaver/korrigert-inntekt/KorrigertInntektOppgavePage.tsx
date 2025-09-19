import { dateFormatter } from '@navikt/sif-common-utils';

import { useAppIntl } from '../../../../i18n';
import { KorrigertInntektOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '../../utils/textUtils';
import AvvikRegisterinntektOppsummering from './parts/AvvikRegisterinntektOppsummering';
import KorrigertInntektOppgavetekst, {
    getUtbetalingsmånedForKorrigertInntektOppgave,
} from './parts/KorrigertInntektOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: KorrigertInntektOppgave;
    initialVisKvittering?: boolean;
}

export const KorrigertInntektOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    // Lag tekster direkte i komponenten
    const antallArbeidsgivere = oppgave.oppgavetypeData.registerinntekt.arbeidOgFrilansInntekter.length;
    const utbetalingsmåned = getUtbetalingsmånedForKorrigertInntektOppgave(oppgave.oppgavetypeData.fraOgMed);

    const sidetittel = intl.text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.sidetittel', {
        måned: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
        antallArbeidsgivere,
    });

    const oppgavetittel = intl.text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel', {
        måned: dateFormatter.monthFullYear(oppgave.oppgavetypeData.fraOgMed),
        antallArbeidsgivere,
    });

    const harTilbakemeldingSpørsmål = intl.text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harTilbakemeldingSpørsmål', {
        antallArbeidsgivere,
    });

    const tilbakemeldingFritekstLabel = intl.text(
        'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tilbakemeldingFritekstLabel',
    );

    const kvitteringTekst = intl.text('oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst', {
        utbetalingsmåned: dateFormatter.monthFullYear(utbetalingsmåned),
    });

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
                    <KorrigertInntektOppgavetekst oppgave={oppgave} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart spørsmål={harTilbakemeldingSpørsmål}>
                    <AvvikRegisterinntektOppsummering oppgave={oppgave} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>{kvitteringTekst}</Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
