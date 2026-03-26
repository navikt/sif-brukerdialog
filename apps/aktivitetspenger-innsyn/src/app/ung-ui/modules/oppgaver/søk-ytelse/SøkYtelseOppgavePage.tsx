import { SøkYtelseOppgave } from '@sif/api/ung-brukerdialog';

import InnsynPage from '../../../components/innsyn-page/InnsynPage';
import SøkYtelseOppgavetekst from './part/SøkYtelseOppgavetekst';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppgavePage = ({ oppgave }: Props) => {
    return (
        <InnsynPage documentTitle="Søknad for ungdomsprogramytelsen oppgave">
            <SøkYtelseOppgavetekst oppgave={oppgave} />
        </InnsynPage>
    );
};

export default SøkYtelseOppgavePage;
