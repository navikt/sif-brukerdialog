import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import SakPage from '../../../components/sak-pages/SakPage';
import { useInnsynsdataContext } from '../../../hooks/useInnsynsdataContext';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function SakRoutePage() {
    const {
        innsynsdata: { saker },
    } = useInnsynsdataContext();
    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <SakPage
            sak={pleietrengendeMedSak.sak}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
            antallSaker={saker.length}
            inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
