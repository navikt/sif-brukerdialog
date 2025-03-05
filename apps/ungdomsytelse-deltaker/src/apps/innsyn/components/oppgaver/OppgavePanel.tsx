import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import EndretSluttdatoOppgaveForm from './EndretSluttdatoOppgaveForm';
import EndretStartdatoOppgaveForm from './EndretStartdatoOppgaveForm';

interface Props {
    programPeriode: OpenDateRange;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave, programPeriode }: Props) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgaveForm oppgave={oppgave} opprinneligStartdato={programPeriode.from} />;
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgaveForm oppgave={oppgave} opprinneligSluttdato={programPeriode.to} />;
    }
};

export default OppgavePanel;
