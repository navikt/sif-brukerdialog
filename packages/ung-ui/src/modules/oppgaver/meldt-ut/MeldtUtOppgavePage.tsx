import { MeldtUtOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { MeldtUtOppsummering } from './parts/MeldtUtOppsummering';
import { MeldUtOppgavetekst } from './parts/MeldUtOppgavetekst';

interface Props {
    navn: string;
    oppgave: MeldtUtOppgave;
    initialVisKvittering?: boolean;
    onCancel: () => void;
}

export const MeldtUtOppgavePage = ({ navn, oppgave, initialVisKvittering, onCancel }: Props) => {
    return (
        <Oppgavebekreftelse
            oppgave={oppgave}
            navn={navn}
            initialVisKvittering={initialVisKvittering}
            onCancel={onCancel}>
            <Oppgavebekreftelse.Ubesvart>
                <MeldUtOppgavetekst
                    sluttdato={oppgave.oppgavetypeData.sluttdato}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
                />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <MeldtUtOppsummering sluttdato={oppgave.oppgavetypeData.sluttdato} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungUi.oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
