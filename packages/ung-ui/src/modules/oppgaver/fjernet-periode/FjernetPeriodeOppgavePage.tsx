import { FjernetPeriodeOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { FjernetPeriodeOppgavetekst } from './parts/FjernetPeriodeOppgavetekst';
import { FjernetPeriodeOppsummering } from './parts/FjernetPeriodeOppsummering';

interface Props {
    navn: string;
    oppgave: FjernetPeriodeOppgave;
    initialVisKvittering?: boolean;
    onCancel: () => void;
}

export const FjernetPeriodeOppgavePage = ({ navn, oppgave, initialVisKvittering, onCancel }: Props) => {
    return (
        <Oppgavebekreftelse
            oppgave={oppgave}
            navn={navn}
            initialVisKvittering={initialVisKvittering}
            onCancel={onCancel}>
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
