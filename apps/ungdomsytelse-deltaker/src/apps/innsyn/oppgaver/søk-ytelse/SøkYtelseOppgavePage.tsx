import { SøkYtelseOppgave } from '@navikt/ung-common';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import SøkYtelseOppgavetekst from './part/SøkYtelseOppavetekst';

interface Props {
    oppgave: SøkYtelseOppgave;
}

const SøkYtelseOppgavePage = ({ oppgave }: Props) => {
    return (
        <DefaultPageLayout documentTitle="Send søknad">
            <SøkYtelseOppgavetekst oppgave={oppgave} />
        </DefaultPageLayout>
    );
};

export default SøkYtelseOppgavePage;
