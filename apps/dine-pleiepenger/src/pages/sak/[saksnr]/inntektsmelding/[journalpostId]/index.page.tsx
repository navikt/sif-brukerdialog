import { withAuthenticatedPage } from '../../../../../auth/withAuthentication';
import LoadingPage from '../../../../../components/page-layout/loading-page/LoadingPage';
import InntektsmeldingDetaljerPage from '../../../../../components/sak-pages/InntektsmeldingDetaljerPage';
import SakIkkeFunnetPage from '../../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingDetailRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return <LoadingPage title="Henter informasjon ..." />;
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <InntektsmeldingDetaljerPage />;
}

export const getServerSideProps = withAuthenticatedPage();
