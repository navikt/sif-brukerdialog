import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';

import { SøkYtelseOppgavetekst } from './part/SokYtelseOppgavetekst';

interface Props {
    oppgave: SøkYtelseOppgave;
    dokumentarkivUrl: string;
}

export const SøkYtelseOppgavePanel = ({ oppgave, dokumentarkivUrl }: Props) => {
    return <SøkYtelseOppgavetekst oppgave={oppgave} dokumentarkivUrl={dokumentarkivUrl} />;
};
