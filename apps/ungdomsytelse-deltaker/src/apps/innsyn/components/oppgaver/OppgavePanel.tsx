import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import KorrigertInntektOppgave from './KorrigertInntektOppgave';
import { OppgaveProvider } from '../oppgave/OppgaveContext';
import EndretProgramperiodeOppgaveForm from './EndretProgramperiodeOppgave';

interface Props {
    programPeriode: OpenDateRange;
    deltakelseId: string;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave, deltakelseId }: Props): React.ReactNode => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT:
            return (
                <OppgaveProvider>
                    <KorrigertInntektOppgave oppgave={oppgave} deltakelseId={deltakelseId} />
                </OppgaveProvider>
            );
        case Oppgavetype.BEKREFT_ENDRET_PROGRAMPERIODE:
            return (
                <OppgaveProvider>
                    <EndretProgramperiodeOppgaveForm oppgave={oppgave} deltakelseId={deltakelseId} />
                </OppgaveProvider>
            );
    }
};

export default OppgavePanel;
