import Oppgavebekreftelse from '@innsyn/modules/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText, useAppIntl } from '@shared/i18n';
import { AvvikRegisterinntektOppgave } from '@shared/types/Oppgave';

import { UttalelseSvaralternativer } from '../../forms/uttalelse-form/UtalelseForm';
import AvvikRegisterinntektOppgavetekst, {
    getUtbetalingsmånedForAvvikRegisterinntektOppgave,
} from './parts/AvvikRegisterinntektOppgavetekst';
import AvvikRegisterinntektOppsummering from './parts/AvvikRegisterinntektOppsummering';

interface Props {
    deltakerNavn: string;
    oppgave: AvvikRegisterinntektOppgave;
    initialVisKvittering?: boolean;
}

const AvvikRegisterinntektOppgavePage = ({ deltakerNavn, oppgave, initialVisKvittering }: Props) => {
    const intl = useAppIntl();

    const utbetalingsmåned = getUtbetalingsmånedForAvvikRegisterinntektOppgave(oppgave.oppgavetypeData.fraOgMed);
    const svaralternativer: UttalelseSvaralternativer = {
        harIkkeUttalelseLabel: intl.text('avvikRegisterinntektOppgavetekst.uttalelseForm.harIkkeTilbakemeldingLabel'),
        harUttalelseLabel: intl.text('avvikRegisterinntektOppgavetekst.uttalelseForm.harTilbakemeldingLabel'),
    };

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(oppgave, intl)}>
            <Oppgavebekreftelse
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                initialVisKvittering={initialVisKvittering}>
                <Oppgavebekreftelse.Ubesvart endreSvaralternativRekkefølge={true}>
                    <AvvikRegisterinntektOppgavetekst oppgave={oppgave} />
                </Oppgavebekreftelse.Ubesvart>

                <Oppgavebekreftelse.Besvart svaralternativer={svaralternativer}>
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
