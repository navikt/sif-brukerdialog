import { EndretSluttdatoOppgave } from '@shared/types/Oppgave';

interface EndretSluttdatoOppsummeringProps {
    oppgave: EndretSluttdatoOppgave;
}

const EndretSluttdatoOppsummering = ({ oppgave }: EndretSluttdatoOppsummeringProps) => {
    const forrigeSluttdato = oppgave.oppgavetypeData.forrigeSluttdato;
    const nySluttdato = oppgave.oppgavetypeData.nySluttdato;

    return (
        <>
            {forrigeSluttdato ? (
                <p>
                    Din sluttdato i ungdomsprogrammet er endret fra{' '}
                    <strong>{new Date(forrigeSluttdato).toLocaleDateString('nb-NO')}</strong> til{' '}
                    <strong>{new Date(nySluttdato).toLocaleDateString('nb-NO')}</strong>.
                </p>
            ) : (
                <p>
                    Du er meldt ut av ungdomsprogrammet fra og med{' '}
                    <strong>{new Date(nySluttdato).toLocaleDateString('nb-NO')}</strong>.
                </p>
            )}
        </>
    );
};

export default EndretSluttdatoOppsummering;
