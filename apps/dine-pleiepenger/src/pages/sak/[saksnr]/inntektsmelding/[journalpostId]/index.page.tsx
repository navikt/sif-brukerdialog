import { Loader } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../../../auth/withAuthentication';
import InntektsmeldingDetaljerPage from '../../../../../components/sak-pages/InntektsmeldingDetaljerPage';
import SakIkkeFunnetPage from '../../../../../components/sak-pages/SakIkkeFunnetPage';
import { usePleietrengendeMedSakFromRoute } from '../../../../../hooks/usePleietrengendeMedSakFromRoute';

export default function InntektsmeldingDetailRoutePage() {
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

    return <InntektsmeldingDetaljerPage />;
}

export const getServerSideProps = withAuthenticatedPage();
