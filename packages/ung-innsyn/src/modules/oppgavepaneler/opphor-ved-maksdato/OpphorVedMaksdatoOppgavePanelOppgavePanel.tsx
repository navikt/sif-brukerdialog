import { OpphorVedMaksdatoOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { OpphorVedMaksdatoOppgavetekst } from './parts/OpphorVedMaksdatoOppgavetekst';
import { OpphorVedMaksdatoOppsummering } from './parts/OpphorVedMaksdatoOppsummering';

interface Props {
    navn: string;
    oppgave: OpphorVedMaksdatoOppgave;
    initialVisKvittering?: boolean;
}

export const OpphorVedMaksdatoOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    if (!oppgave.oppgavetypeData.maksdato) {
        throw new Error('Maks dato mangler for oppgave av typen OpphorVedMaksdatoOppgave');
    }

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <OpphorVedMaksdatoOppgavetekst
                    sisteDag={oppgave.oppgavetypeData.maksdato}
                    svarfrist={oppgave.sisteDatoEnKanSvare}
                />
            </Oppgavebekreftelse.Ubesvart>
            <Oppgavebekreftelse.Besvart>
                <OpphorVedMaksdatoOppsummering sisteDag={oppgave.oppgavetypeData.maksdato} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_OPPHOR_VED_MAKSDATO.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
