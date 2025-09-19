import { dateFormatter } from '@navikt/sif-common-utils';
import { EndretStartdatoOppgave } from '@shared/types/Oppgave';

interface EndretStartdatoOppsummeringProps {
    oppgave: EndretStartdatoOppgave;
}

export const EndretStartdatoOppsummering = ({ oppgave }: EndretStartdatoOppsummeringProps) => {
    return (
        <>
            Startdato i ungdomsprogrammet er endret til{' '}
            <strong>{dateFormatter.full(oppgave.oppgavetypeData.nyStartdato)}.</strong>
        </>
    );
};
