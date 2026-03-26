import { dateFormatter } from '@navikt/sif-common-utils';
import { AvvikRegisterinntektOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import {
    AvvikRegisterinntektOppgavetekst,
    getUtbetalingsmånedForAvvikRegisterinntektOppgave,
} from './parts/AvvikRegisterinntektOppgavetekst';
import { AvvikRegisterinntektOppsummering } from './parts/AvvikRegisterinntektOppsummering';

interface Props {
    navn: string;
    oppgave: AvvikRegisterinntektOppgave;
    initialVisKvittering?: boolean;
}

export const AvvikRegisterinntektOppgavePage = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const utbetalingsmåned = getUtbetalingsmånedForAvvikRegisterinntektOppgave(oppgave.oppgavetypeData.fraOgMed);

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <AvvikRegisterinntektOppgavetekst oppgave={oppgave} />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <AvvikRegisterinntektOppsummering oppgave={oppgave} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText
                    id="oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst"
                    values={{
                        utbetalingsmåned: dateFormatter.monthFullYear(utbetalingsmåned),
                    }}
                />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
