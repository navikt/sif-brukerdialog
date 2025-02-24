import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import EndretSluttdatoOppgave from './EndretSluttdatoOppgave';
import EndretStartdatoOppgave from './EndretStartdatoOppgave';

interface Props {
    programPeriode: OpenDateRange;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave, programPeriode }: Props) => {
    switch (oppgave.oppgavetype) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgave oppgave={oppgave} opprinneligStartdato={programPeriode.from} />;
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgave oppgave={oppgave} opprinneligSluttdato={programPeriode.to} />;
    }
};

export default OppgavePanel;
