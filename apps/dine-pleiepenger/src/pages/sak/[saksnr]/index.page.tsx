import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import LoadingPage from '../../../components/page-layout/loading-page/LoadingPage';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import SakPage from '../../../components/sak-pages/SakPage';
import { useInnsynsdataContext } from '../../../hooks/useInnsynsdataContext';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function SakRoutePage() {
    const router = useRouter();
    const { pleietrengendeMedSak, saksnr, isLoading, error } = usePleietrengendeMedSakFromRoute();
    const {
        innsynsdata: { sakerMetadata },
    } = useInnsynsdataContext();

    useEffect(() => {
        if (saksnr && sakerMetadata && !sakerMetadata.find((s) => s.saksnummer === saksnr)) {
            router.push('/');
        }
    }, [saksnr, sakerMetadata, router]);

    if (!saksnr) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    /** Viser loading skjerm frem til sjekk er gjort */
    if (sakerMetadata && !sakerMetadata.find((s) => s.saksnummer === saksnr)) {
        return <LoadingPage />;
    }

    return (
        <SakPage saksnr={saksnr} pleietrengendeMedSak={pleietrengendeMedSak} isLoading={isLoading} isError={!!error} />
    );
}

export const getServerSideProps = withAuthenticatedPage();
