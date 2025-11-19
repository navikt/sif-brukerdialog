import { withAuthenticatedPage } from '../../../../../auth/withAuthentication';
import PageLoading from '../../../../../components/page-layout/page-loading/PageLoading';
import InntektsmeldingDetaljerPage from '../../../../../components/sak-pages/InntektsmeldingDetaljerPage';
import SakIkkeFunnetPage from '../../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingDetailRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return <PageLoading title="Henter informasjon ..." />;
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <InntektsmeldingDetaljerPage />;
}

export const getServerSideProps = withAuthenticatedPage();
