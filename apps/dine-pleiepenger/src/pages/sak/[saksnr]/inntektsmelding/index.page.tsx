import { withAuthenticatedPage } from '../../../../auth/withAuthentication';
import InntektsmeldingerPage from '../../../../components/sak-pages/InntektsmeldingerPage';
import SakIkkeFunnetPage from '../../../../components/sak-pages/SakIkkeFunnetPage';
import { useInnsynsdataContext } from '../../../../hooks/useInnsynsdataContext';
import { usePleietrengendeMedSakFromRoute } from '../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingerRoutePage() {
    const {
        innsynsdata: { saker },
    } = useInnsynsdataContext();

    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <InntektsmeldingerPage
            sak={pleietrengendeMedSak.sak}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
            harFlereSaker={saker.length > 1}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
