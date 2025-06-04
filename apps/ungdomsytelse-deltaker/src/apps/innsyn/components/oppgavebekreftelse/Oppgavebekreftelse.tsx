import { BekreftelseOppgave, OppgaveStatus } from '@navikt/ung-common';
import UløstOppgavebekreftelse from './UløstOppgavebekreftelse';
import LøstOppgavebekreftelse from './LøstOppgavebekreftelse';
import { usePrevious } from '@navikt/sif-common-hooks';

export interface OppgavebekreftelseTekster {
    tittel: string;
    forstårOppgaveSpørsmål: string;
}
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
                deltakerNavn={props.deltakerNavn}
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
