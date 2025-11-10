import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import ComponentLoader from '../../../components/component-loader/ComponentLoader';
import EmptyPage from '../../../components/page-layout/empty-page/EmptyPage';
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
            <EmptyPage>
                <Head>Henter informasjon - Dine pleiepenger for sykt barn</Head>
                <HStack align="center" justify="center" marginBlock="8 0">
                    <VStack gap="4">
                        <ComponentLoader />
                        <BodyShort size="large">Henter informasjon...</BodyShort>
                    </VStack>
                </HStack>
            </EmptyPage>
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
