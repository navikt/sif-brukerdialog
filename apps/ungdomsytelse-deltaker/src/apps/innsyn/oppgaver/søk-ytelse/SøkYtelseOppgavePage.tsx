import { SøkYtelseOppgave } from '@navikt/ung-common';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
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
