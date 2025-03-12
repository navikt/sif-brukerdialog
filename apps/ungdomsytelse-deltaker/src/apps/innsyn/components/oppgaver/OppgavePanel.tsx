import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import EndretSluttdatoOppgaveForm from './EndretSluttdatoOppgaveForm';
import EndretStartdatoOppgaveForm from './EndretStartdatoOppgaveForm';
import KorrigertInntektOppgave from './KorrigertInntektOppgave';

interface Props {
    programPeriode: OpenDateRange;
    deltakelseId: string;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave, deltakelseId, programPeriode }: Props): React.ReactNode => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return (
                <EndretStartdatoOppgaveForm
                    oppgave={oppgave}
                    deltakelseId={deltakelseId}
                    opprinneligStartdato={programPeriode.from}
                />
            );
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return (
                <EndretSluttdatoOppgaveForm
                    oppgave={oppgave}
                    deltakelseId={deltakelseId}
                    opprinneligSluttdato={programPeriode.to}
                />
            );
        case Oppgavetype.BEKREFT_KORRIGERT_INNTEKT:
            return <KorrigertInntektOppgave oppgave={oppgave} deltakelseId={deltakelseId} />;
    }
};

export default OppgavePanel;
