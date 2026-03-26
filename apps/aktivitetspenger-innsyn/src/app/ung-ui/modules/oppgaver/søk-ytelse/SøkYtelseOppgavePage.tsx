import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';

import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
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
