import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import HistorikkPage from '../../../components/sak-pages/HistorikkPage';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function HistorikkRoutePage() {
    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <HistorikkPage sak={pleietrengendeMedSak.sak} inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger} />;
}

export const getServerSideProps = withAuthenticatedPage();
