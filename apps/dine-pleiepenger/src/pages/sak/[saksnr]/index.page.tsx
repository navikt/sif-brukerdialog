import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { withAuthenticatedPage } from '../../../auth/withAuthentication';
import { useInnsynsdataContext } from '../../../hooks/useInnsynsdataContext';
import { Feature } from '../../../utils/features';
import SakPage from '../SakPage';
import { useRouter } from 'next/router';
import { PleietrengendeMedSak } from '../../../server/api-models/PleietrengendeMedSakSchema';
import { Alert, Box } from '@navikt/ds-react';
import DefaultPageLayout from '../../../components/page-layout/default-page-layout/DefaultPageLayout';
import Head from 'next/head';

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
        innsynsdata: { innsendteSøknader, saker, saksbehandlingstidUker },
    } = useInnsynsdataContext();
    const router = useRouter();
    const { saksnr } = router.query;
    const pleietrengendeMedSak = getSakFromSaksnr(saker, saksnr);

    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        if (Feature.HENT_BEHANDLINGSTID && Feature.HENT_SAKER && logInfo) {
            logInfo({
                antallSøknader: innsendteSøknader.length,
                antallSaker: saker.length,
                harSaksbehandlingstid: !!saksbehandlingstidUker,
            });
        }
    });

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
        />
    );
}

export const getServerSideProps = withAuthenticatedPage();
