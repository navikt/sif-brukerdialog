import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartOgSluttdatoOppgave } from '@sif/api/ung-brukerdialog';
import { ReactNode } from 'react';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { EndretStartOgSluttdatoOppgavetekst } from './parts/EndretStartOgSluttdatoOppgavetekst';

interface Props {
    navn: string;
    oppgave: EndretStartOgSluttdatoOppgave;
    initialVisKvittering?: boolean;
}

export const EndretStartOgSluttdatoOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <EndretStartOgSluttdatoOppgavetekst
                    frist={oppgave.sisteDatoEnKanSvare}
                    nyPeriode={oppgave.oppgavetypeData.nyPeriode}
                />
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <UngUiText
                    id="@ungInnsyn.endretStartOgSluttdato.oppsummering"
                    values={{
                        fom: dateFormatter.full(oppgave.oppgavetypeData.nyPeriode.from),
                        tom: dateFormatter.full(oppgave.oppgavetypeData.nyPeriode.to),
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                    }}
                />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
