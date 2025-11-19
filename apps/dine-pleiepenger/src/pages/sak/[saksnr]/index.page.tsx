import { useRouter } from 'next/router';

import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import PageLoading from '../../../components/page-layout/page-loading/PageLoading';
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

    if (!saksnr) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    if (sakerMetadata && !sakerMetadata.find((s) => s.saksnummer === saksnr)) {
        router.push('/');
        return <PageLoading />;
    }

    return (
        <SakPage saksnr={saksnr} pleietrengendeMedSak={pleietrengendeMedSak} isLoading={isLoading} isError={!!error} />
    );
}

export const getServerSideProps = withAuthenticatedPage();
