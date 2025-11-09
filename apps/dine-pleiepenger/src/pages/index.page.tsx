import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { withAuthenticatedPage } from '../auth/withAuthentication';
import SøknaderEllerIngenSakFalback from '../components/søknader-eller-ingen-sak-fallback/SøknaderEllerIngenSakFalback';
import VelgSakPage from '../components/velg-sak-page/VelgSakPage';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useVerifyUserOnWindowFocus } from '../hooks/useVerifyUserOnWindowFocus';
import { Søker } from '../server/api-models/SøkerSchema';
import { browserEnv } from '../utils/env';

const søkerIdFetcher = async (): Promise<string> => {
    const url = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soker`;
    return axios.get<Søker>(url).then((res) => res.data.fødselsnummer);
};

function DinePleiepengerPage() {
    const router = useRouter();
    const {
        innsynsdata: { sakerMetadata, søker },
    } = useInnsynsdataContext();

    useVerifyUserOnWindowFocus(søker.fødselsnummer, søkerIdFetcher);

    useEffect(() => {
        if (sakerMetadata.length === 1) {
            router.replace(`/sak/${sakerMetadata[0].saksnummer}`);
        }
    }, [sakerMetadata, router]);

    if (sakerMetadata.length === 1) {
        return null; // Redirecting
    }

    if (sakerMetadata.length > 1) {
        return <VelgSakPage sakerMetadata={sakerMetadata} />;
    }

    return <SøknaderEllerIngenSakFalback />;
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
