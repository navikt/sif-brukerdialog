import { ReactElement } from 'react';
import axios from 'axios';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import VelgSakPage from '../components/velg-sak-page/VelgSakPage';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useVerifyUserOnWindowFocus } from '../hooks/useVerifyUserOnWindowFocus';
import { Søker } from '../server/api-models/SøkerSchema';
import { browserEnv } from '../utils/env';
import SakPage from './sak/SakPage';
import SøknaderEllerIngenSakFalback from '../components/søknader-eller-ingen-sak-fallback/SøknaderEllerIngenSakFalback';

const søkerIdFetcher = async (): Promise<string> => {
    const url = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soker`;
    return axios.get<Søker>(url).then((res) => res.data.fødselsnummer);
};

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { saker, søker },
    } = useInnsynsdataContext();

    useVerifyUserOnWindowFocus(søker.fødselsnummer, søkerIdFetcher);

    if (saker.length === 1) {
        return <SakPage sak={saker[0].sak} antallSaker={1} pleietrengende={saker[0].pleietrengende} />;
    }

    if (saker.length > 1) {
        return <VelgSakPage saker={saker} />;
    }

    return <SøknaderEllerIngenSakFalback />;
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
