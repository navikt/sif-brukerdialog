import { withAuthenticatedPage } from '../../../../auth/withAuthentication';
import LoadingPage from '../../../../components/page-layout/loading-page/LoadingPage';
import InntektsmeldingerPage from '../../../../components/sak-pages/InntektsmeldingerPage';
import SakIkkeFunnetPage from '../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingerRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return <LoadingPage title="Henter informasjon ..." />;
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <InntektsmeldingerPage
            sak={pleietrengendeMedSak.sak}
            inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
