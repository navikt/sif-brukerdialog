import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';
import { ReactNode } from 'react';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { BostedVilkarOpphorOppgavePanelOppgavetekst } from './parts/BostedVilkarOpphorOppgavePanelOppgavetekst';

interface Props {
    navn: string;
    oppgave: BostedVilkårOpphørOppgave;
    initialVisKvittering?: boolean;
}

export const BostedVilkårOpphørOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <BostedVilkarOpphorOppgavePanelOppgavetekst frist={oppgave.frist} {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <UngUiText
                    id="@ungInnsyn.bostedVilkårOpphørOppgave.oppsummering"
                    values={{ strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_BOSTED_OPPHØR.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
