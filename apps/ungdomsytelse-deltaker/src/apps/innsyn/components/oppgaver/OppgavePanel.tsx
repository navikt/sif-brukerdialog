import { OpenDateRange } from '@navikt/sif-common-formik-ds';
import { Oppgave, Oppgavetype } from '../../../../api/schemas/oppgaveSchema';
import EndretSluttdatoOppgave from './EndretSluttdatoOppgave';
import EndretStartdatoOppgave from './EndretStartdatoOppgave';

interface Props {
    programPeriode: OpenDateRange;
    oppgave: Oppgave;
}

const OppgavePanel = ({ oppgave }: Props) => {
    switch (oppgave.type) {
        case Oppgavetype.bekreftEndretStartdato:
            return <EndretStartdatoOppgave oppgave={oppgave} />;
        case Oppgavetype.bekreftEndretSluttdato:
            return <EndretSluttdatoOppgave oppgave={oppgave} />;
    }
};

export default OppgavePanel;
