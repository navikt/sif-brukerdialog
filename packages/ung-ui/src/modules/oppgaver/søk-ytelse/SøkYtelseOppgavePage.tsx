import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';

import { SøkYtelseOppgavetekst } from './part/SøkYtelseOppgavetekst';

interface Props {
    oppgave: SøkYtelseOppgave;
}

export const SøkYtelseOppgavePage = ({ oppgave }: Props) => {
    return <SøkYtelseOppgavetekst oppgave={oppgave} />;
};
