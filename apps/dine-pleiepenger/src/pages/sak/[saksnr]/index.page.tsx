import { Loader } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import SakIkkeFunnetPage from '../../../components/sak-pages/SakIkkeFunnetPage';
import SakPage from '../../../components/sak-pages/SakPage';
import { useInnsynsdataContext } from '../../../hooks/useInnsynsdataContext';
import { usePleietrengendeMedSakFromRoute } from '../../../hooks/usePleietrengendeMedSakFromRoute';

export default function SakRoutePage() {
    const {
        innsynsdata: { sakerMetadata },
    } = useInnsynsdataContext();
    const { pleietrengendeMedSak, saksnr, isLoading, error } = usePleietrengendeMedSakFromRoute();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="3xlarge" title="Laster saksdata..." />
            </div>
        );
    }

    if (error || !pleietrengendeMedSak) {
        return <SakIkkeFunnetPage saksnr={saksnr} />;
    }

    return (
        <SakPage
            sak={pleietrengendeMedSak.sak}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
            antallSaker={sakerMetadata.length}
            inntektsmeldinger={pleietrengendeMedSak.inntektsmeldinger}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
