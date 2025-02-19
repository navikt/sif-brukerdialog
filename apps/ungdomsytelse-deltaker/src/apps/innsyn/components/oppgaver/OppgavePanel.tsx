import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '@navikt/ung-common';
import EndretSluttdatoOppgave from './EndretSluttdatoOppgave';
import EndretStartdatoOppgave from './EndretStartdatoOppgave';

interface Props {
    programPeriode: OpenDateRange;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave }: Props) => {
    switch (oppgave.type) {
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return <EndretStartdatoOppgave oppgave={oppgave} />;
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return <EndretSluttdatoOppgave oppgave={oppgave} />;
    }
};

export default OppgavePanel;
