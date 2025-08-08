import { usePrevious } from '@navikt/sif-common-hooks';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { BekreftelseOppgave } from '../../../../types/Oppgave';
import LøstOppgavebekreftelse from './parts/LøstOppgavebekreftelse';
import UløstOppgavebekreftelse from './parts/UløstOppgavebekreftelse';
import { OppgavebekreftelseTekster } from './types';

interface Props {
    tekster: OppgavebekreftelseTekster;
    oppsummering: React.ReactNode;
    deltakerNavn: string;
    oppgave: BekreftelseOppgave;
    children: React.ReactNode;
}

const Oppgavebekreftelse = (props: Props) => {
    const { oppgave, oppsummering, children, ...rest } = props;

    /** Brukes for å sjekke om en skal vise kvittering etter innsending */
    const erOpprinneligUløst = usePrevious(oppgave.status) === OppgaveStatus.ULØST;

    if (oppgave.status !== OppgaveStatus.ULØST && erOpprinneligUløst === false) {
        return (
            <LøstOppgavebekreftelse
                {...rest}
                bekreftelse={oppgave.bekreftelse}
                oppsummering={oppsummering}
                oppgave={oppgave}
            />
        );
    }
    return (
        <UløstOppgavebekreftelse oppgave={oppgave} {...rest}>
            {children}
        </UløstOppgavebekreftelse>
    );
};

export default Oppgavebekreftelse;
