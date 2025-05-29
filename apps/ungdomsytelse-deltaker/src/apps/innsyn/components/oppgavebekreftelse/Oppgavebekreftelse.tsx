import { BekreftelseOppgave, OppgaveStatus } from '@navikt/ung-common';
import UløstOppgavebekreftelse from './UløstOppgavebekreftelse';
import LøstOppgavebekreftelse from './LøstOppgavebekreftelse';
import { usePrevious } from '@navikt/sif-common-hooks';
import OppgavebekreftelseFellestekst from './OppgavebekreftelseFellestekst';

interface Props {
    oppgavetittel: string;
    deltakerNavn: string;
    oppgave: BekreftelseOppgave;
    children: React.ReactNode;
}

const Oppgavebekreftelse = (props: Props) => {
    const { oppgave, children, ...rest } = props;

    /** Brukes for å sjekke om en skal vise kvittering etter innsending */
    const erOpprinneligUløst = usePrevious(oppgave.status) === OppgaveStatus.ULØST;

    if (oppgave.status !== OppgaveStatus.ULØST && erOpprinneligUløst === false) {
        return (
            <LøstOppgavebekreftelse {...rest} bekreftelse={oppgave.bekreftelse}>
                {children}
                <OppgavebekreftelseFellestekst svarfrist={oppgave.svarfrist} />
            </LøstOppgavebekreftelse>
        );
    }
    return (
        <UløstOppgavebekreftelse oppgave={oppgave} {...rest}>
            {children}
            <OppgavebekreftelseFellestekst svarfrist={oppgave.svarfrist} />
        </UløstOppgavebekreftelse>
    );
};

export default Oppgavebekreftelse;
