import { AutomatiskOpphorOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { AutomatiskOpphorOppgavetekst } from './parts/AutomatiskOpphorOppgavetekst';
import { AutomatiskOpphorOppsummering } from './parts/AutomatiskOpphorOppsummering';

interface Props {
    navn: string;
    oppgave: AutomatiskOpphorOppgave;
    initialVisKvittering?: boolean;
}

export const AutomatiskOpphorOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    if (!oppgave.oppgavetypeData.maksDato) {
        throw new Error('Maks dato mangler for oppgave av typen AutomatiskOpphorOppgave');
    }

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <AutomatiskOpphorOppgavetekst
                    sisteDag={oppgave.oppgavetypeData.maksDato}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
                />
            </Oppgavebekreftelse.Ubesvart>
            <Oppgavebekreftelse.Besvart>
                <AutomatiskOpphorOppsummering sisteDag={oppgave.oppgavetypeData.maksDato} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_AUTOMATISK_OPPHOR.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
