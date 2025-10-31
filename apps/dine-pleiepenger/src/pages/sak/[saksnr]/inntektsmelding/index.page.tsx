import { withAuthenticatedPage } from '../../../../auth/withAuthentication';
import InntektsmeldingerPage from '../../../../components/sak-pages/InntektsmeldingerPage';
import SakIkkeFunnetPage from '../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingerRoutePage() {
    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <InntektsmeldingerPage sak={pleietrengendeMedSak.sak} />;
}

export const getServerSideProps = withAuthenticatedPage();
