import { withAuthenticatedPage } from '../../../../../auth/withAuthentication';
import InntektsmeldingDetaljerPage from '../../../../../components/sak-pages/InntektsmeldingDetaljerPage';
import SakIkkeFunnetPage from '../../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingDetailRoutePage() {
    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <InntektsmeldingDetaljerPage />;
}

export const getServerSideProps = withAuthenticatedPage();
