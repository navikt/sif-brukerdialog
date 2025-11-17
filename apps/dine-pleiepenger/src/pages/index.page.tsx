import { useRouter } from 'next/router';
import { useEffect } from 'react';

import PageLoading from '../components/page-layout/page-loading/PageLoading';
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
        return <PageLoading />;
    }

    if (sakerMetadata.length > 1) {
        return <VelgSakPage sakerMetadata={sakerMetadata} />;
    }

    return <SøknaderEllerIngenSakFalback />;
}

// export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
