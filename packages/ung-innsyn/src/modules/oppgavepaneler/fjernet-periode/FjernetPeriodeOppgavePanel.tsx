import { FjernetPeriodeOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { FjernetPeriodeOppgavetekst } from './parts/FjernetPeriodeOppgavetekst';
import { FjernetPeriodeOppsummering } from './parts/FjernetPeriodeOppsummering';

interface Props {
    navn: string;
    oppgave: FjernetPeriodeOppgave;
    initialVisKvittering?: boolean;
}

export const FjernetPeriodeOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <FjernetPeriodeOppgavetekst svarfrist={oppgave.sisteDatoEnKanSvare} />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <FjernetPeriodeOppsummering />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
