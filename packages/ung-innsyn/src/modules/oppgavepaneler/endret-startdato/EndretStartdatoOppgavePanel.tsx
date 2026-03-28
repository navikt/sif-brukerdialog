import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartdatoOppgave } from '@sif/api/ung-brukerdialog';
import { ReactNode } from 'react';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { EndretStartdatoOppgavetekst } from './parts/EndretStartdatoOppgavetekst';

interface Props {
    navn: string;
    oppgave: EndretStartdatoOppgave;
    initialVisKvittering?: boolean;
}

export const EndretStartdatoOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const formatertDato = (
        <span className="text-nowrap">{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}</span>
    );

    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <EndretStartdatoOppgavetekst
                    frist={oppgave.sisteDatoEnKanSvare}
                    startdato={oppgave.oppgavetypeData.nyStartdato}
                />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <UngUiText
                    id="@ungInnsyn.endretStartdato.oppsummering"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
