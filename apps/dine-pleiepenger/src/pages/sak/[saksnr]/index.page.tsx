import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import SakPage from '../../../components/sak-pages/SakPage';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function SakRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading, error } = usePleietrengendeMedSakFromRoute();

    if (!saksnr) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <SakPage saksnr={saksnr} pleietrengendeMedSak={pleietrengendeMedSak} isLoading={isLoading} isError={!!error} />
    );
}

export const getServerSideProps = withAuthenticatedPage();
