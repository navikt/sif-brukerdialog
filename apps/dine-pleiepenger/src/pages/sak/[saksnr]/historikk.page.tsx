import { Loader } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import HistorikkPage from '../../../components/sak-pages/HistorikkPage';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function HistorikkRoutePage() {
    const { pleietrengendeMedSak, saksnr, isLoading } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="3xlarge" title="Laster saksdata..." />
            </div>
        );
    }

    if (!pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return <HistorikkPage sak={pleietrengendeMedSak.sak} inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger} />;
}

export const getServerSideProps = withAuthenticatedPage();
