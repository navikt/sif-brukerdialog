import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import PageLoading from '../../../components/page-layout/page-loading/PageLoading';
import HistorikkPage from '../../../components/sak-pages/HistorikkPage';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function HistorikkRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return <PageLoading title="Henter informasjon..." />;
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <HistorikkPage sak={pleietrengendeMedSak.sak} inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger} />;
}

export const getServerSideProps = withAuthenticatedPage();
