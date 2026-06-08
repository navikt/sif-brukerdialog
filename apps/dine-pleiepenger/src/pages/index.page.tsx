import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { withAuthenticatedPage } from '../auth/withAuthentication';
import LoadingPage from '../components/page-layout/loading-page/LoadingPage';
import SøknaderEllerIngenSakFalback from '../components/søknader-eller-ingen-sak-fallback/SøknaderEllerIngenSakFalback';
import VelgSakPage from '../components/velg-sak-page/VelgSakPage';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';

function DinePleiepengerPage() {
    const router = useRouter();
    const {
        innsynsdata: { sakerMetadata },
    } = useInnsynsdataContext();

    useEffect(() => {
        if (sakerMetadata.length === 1) {
            router.replace(`/sak/${sakerMetadata[0].saksnummer}`);
        }
    }, [sakerMetadata, router]);

    if (sakerMetadata.length === 1) {
        return <LoadingPage />;
    }

    if (sakerMetadata.length > 1) {
        return <VelgSakPage sakerMetadata={sakerMetadata} />;
    }

    return <SøknaderEllerIngenSakFalback />;
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
