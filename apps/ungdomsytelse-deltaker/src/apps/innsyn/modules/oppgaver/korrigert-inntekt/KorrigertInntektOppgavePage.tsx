import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { KorrigertInntektOppgave } from '@shared/types/Oppgave';

import AvvikRegisterinntektOppsummering from './parts/AvvikRegisterinntektOppsummering';
import KorrigertInntektOppgavetekst, {
    getUtbetalingsmånedForKorrigertInntektOppgave,
} from './parts/KorrigertInntektOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: KorrigertInntektOppgave;
    initialVisKvittering?: boolean;
}

const KorrigertInntektOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    const utbetalingsmåned = getUtbetalingsmånedForKorrigertInntektOppgave(oppgave.oppgavetypeData.fraOgMed);

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <KorrigertInntektOppgavetekst oppgave={oppgave} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart>
                    <AvvikRegisterinntektOppsummering oppgave={oppgave} />
                </Oppgavebekreftelse.Besvart>

                <Oppgavebekreftelse.Kvittering>
                    <AppText
                        id="oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst"
                        values={{
                            utbetalingsmåned: dateFormatter.monthFullYear(utbetalingsmåned),
                        }}
                    />
                </Oppgavebekreftelse.Kvittering>
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};

export default KorrigertInntektOppgavePage;
