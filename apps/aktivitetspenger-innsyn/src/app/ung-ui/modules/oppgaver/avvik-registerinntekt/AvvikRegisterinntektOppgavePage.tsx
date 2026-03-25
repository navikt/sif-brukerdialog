import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { AppText, useAppIntl } from '../../../../i18n';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import Oppgavebekreftelse from '../../oppgavebekreftelse/Oppgavebekreftelse';
import AvvikRegisterinntektOppgavetekst, {
    getUtbetalingsmånedForAvvikRegisterinntektOppgave,
} from './parts/AvvikRegisterinntektOppgavetekst';
import AvvikRegisterinntektOppsummering from './parts/AvvikRegisterinntektOppsummering';

interface Props {
    navn: string;
    oppgave: AvvikRegisterinntektOppgave;
    initialVisKvittering?: boolean;
}

const AvvikRegisterinntektOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    const utbetalingsmåned = getUtbetalingsmånedForAvvikRegisterinntektOppgave(oppgave.oppgavetypeData.fraOgMed);

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart>
                    <AvvikRegisterinntektOppgavetekst oppgave={oppgave} />
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

export default AvvikRegisterinntektOppgavePage;
