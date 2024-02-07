import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineInnsendteSøknader from '../components/dine-innsendte-søknader/DineInnsendteSøknader';
import HvaSkjer from '../components/hva-skjer/HvaSkjer';
import DefaultPageLayout from '../components/page-layout/default-page-layout/DefaultPageLayout';
import Snarveier from '../components/snarveier/Snarveier';
import Svarfrist from '../components/svarfrist/Svarfrist';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { Feature } from '../utils/features';
import SakPage from './sak/SakPage';

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { innsendteSøknader, saker, saksbehandlingstidUker },
    } = useInnsynsdataContext();

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

    if (saker.length === 1) {
        return (
            <SakPage
                sak={saker[0].sak}
                pleietrengende={saker[0].pleietrengende}
                saksbehandlingstidUker={saksbehandlingstidUker}
            />
        );
    }
    return (
        <DefaultPageLayout>
            <Head>
                <title>Dine pleiepenger</title>
            </Head>
            <VStack gap="12">
                <Box>
                    <Snarveier />
                </Box>
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineInnsendteSøknader søknader={innsendteSøknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Svarfrist
                            frist={saker.length > 0 ? saker[0].sak.saksbehandlingsFrist : undefined}
                            saksbehandlingstidUker={saksbehandlingstidUker}
                        />
                    </div>
                </Box>
                <Box>
                    <HvaSkjer />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
