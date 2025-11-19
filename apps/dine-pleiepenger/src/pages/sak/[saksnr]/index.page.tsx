import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import PageLoading from '../../../components/page-layout/page-loading/PageLoading';
import SakErrorPage from '../../../components/sak-pages/SakErrorPage';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import SakPage from '../../../components/sak-pages/SakPage';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function SakRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading, error } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return (
            <PageLoading
                title="Henter informasjon..."
                documentTitle="Henter informasjon - Dine pleiepenger for sykt barn"
            />
        );
    }

    if (error) {
        return <SakErrorPage saksnr={saksnr} error={error} />;
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <SakPage
            sak={pleietrengendeMedSak.sak}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
            inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
