import { withAuthenticatedPage } from '../../../../../auth/withAuthentication';
import InntektsmeldingDetaljerPage from '../../../../../components/sak-pages/InntektsmeldingDetaljerPage';
import SakIkkeFunnetPage from '../../../../../components/sak-pages/SakIkkeFunnetPage';
import { useInnsynsdataContext } from '../../../../../hooks/useInnsynsdataContext';
import { usePleietrengendeMedSakFromRoute } from '../../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingDetailRoutePage() {
    const {
        innsynsdata: { saker },
    } = useInnsynsdataContext();

    const { pleietrengendeMedSak, saksnr } = usePleietrengendeMedSakFromRoute();

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <InntektsmeldingDetaljerPage
            sak={pleietrengendeMedSak.sak}
            harFlereSaker={saker.length > 1}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
