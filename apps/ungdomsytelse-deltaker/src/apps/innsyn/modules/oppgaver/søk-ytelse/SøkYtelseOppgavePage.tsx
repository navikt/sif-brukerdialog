import DefaultPageLayout from '@shared/pages/layout/DefaultPageLayout';
import { SøkYtelseOppgave } from '@shared/types/Oppgave';

import SøkYtelseOppgavetekst from './part/SøkYtelseOppgavetekst';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppgavePage = ({ oppgave }: Props) => {
    return (
        <DefaultPageLayout documentTitle="Søknad for ungdomsprogramytelsen oppgave">
            <SøkYtelseOppgavetekst oppgave={oppgave} />
        </DefaultPageLayout>
    );
};

export default SøkYtelseOppgavePage;
