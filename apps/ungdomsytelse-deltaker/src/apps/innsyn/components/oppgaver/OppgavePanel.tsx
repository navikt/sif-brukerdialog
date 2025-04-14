import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import EndretSluttdatoOppgaveForm from './EndretSluttdatoOppgaveForm';
import EndretStartdatoOppgaveForm from './EndretStartdatoOppgaveForm';
import KorrigertInntektOppgave from './KorrigertInntektOppgave';
import { OppgaveProvider } from '../oppgave/OppgaveContext';
import EndretProgramperiodeOppgaveForm from './EndretProgramperiodeOppgave';

interface Props {
    programPeriode: OpenDateRange;
    deltakelseId: string;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave, deltakelseId, programPeriode }: Props): React.ReactNode => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return (
                <OppgaveProvider>
                    <EndretStartdatoOppgaveForm
                        oppgave={oppgave}
                        deltakelseId={deltakelseId}
                        opprinneligStartdato={programPeriode.from}
                    />
                </OppgaveProvider>
            );
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return (
                <OppgaveProvider>
                    <EndretSluttdatoOppgaveForm
                        oppgave={oppgave}
                        deltakelseId={deltakelseId}
                        opprinneligSluttdato={programPeriode.to}
                    />
                </OppgaveProvider>
            );
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
