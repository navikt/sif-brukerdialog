import { Alert, Box } from '@navikt/ds-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import DefaultPageLayout from '../../../components/page-layout/default-page-layout/DefaultPageLayout';
import { useInnsynsdataContext } from '../../../hooks/useInnsynsdataContext';
import { PleietrengendeMedSak } from '../../../server/api-models/PleietrengendeMedSakSchema';
import SakPage from '../SakPage';

const getSakFromSaksnr = (
    saker: PleietrengendeMedSak[],
    saksnr?: string | string[],
): PleietrengendeMedSak | undefined => {
    if (!saksnr || typeof saksnr !== 'string' || saker.length === 0) {
        return undefined;
    }
    return saker.find((sak) => sak.sak.saksnummer === saksnr);
};

export default function SakRoutePage() {
    const {
        innsynsdata: { saker, saksbehandlingstidUker },
    } = useInnsynsdataContext();
    const router = useRouter();
    const { saksnr } = router.query;
    const pleietrengendeMedSak = getSakFromSaksnr(saker, saksnr);

    if (!pleietrengendeMedSak) {
        return (
            <DefaultPageLayout>
                <Head>
                    <title>Sak ikke funnet</title>
                </Head>
                <Box className="mb-10">
                    <Alert variant="error">Kunne ikke finne sak med saksnr "{router.query.saksnr}"</Alert>
                </Box>
            </DefaultPageLayout>
        );
    }

    return (
        <SakPage
            sak={pleietrengendeMedSak.sak}
            pleietrengende={pleietrengendeMedSak.pleietrengende}
            saksbehandlingstidUker={saksbehandlingstidUker}
            antallSaker={saker.length}
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
