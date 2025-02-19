import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave } from '../../../../api/schemas/oppgaveSchema';
import { Oppgavetype } from '../../../../types/Oppgavetype';
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
