import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import HvaSkjer from '../components/hva-skjer/HvaSkjer';
import DefaultPage from '../components/page-layout/default-page/DefaultPage';
import Snarveier from '../components/snarveier/Snarveier';
import Svarfrist from '../components/svarfrist/Svarfrist';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { Feature } from '../utils/features';

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { søknader, svarfrist, behandlingstid },
    } = useInnsynsdataContext();

    const { logInfo } = useAmplitudeInstance();

    useEffectOnce(() => {
        if (Feature.HENT_BEHANDLINGSTID && Feature.HENT_SVARFRIST) {
            logInfo({
                antallSøknader: søknader.length,
                harSvarfrist: !!svarfrist,
                harBehandlingstid: !!behandlingstid,
            });
        }
    });

    return (
        <DefaultPage>
            <Head>
                <title>Dine pleiepenger</title>
            </Head>
            <VStack gap="12">
                <Box>
                    <Snarveier />
                </Box>
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineSøknader søknader={søknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Svarfrist
                            frist={søknader.length > 0 ? svarfrist : undefined}
                            ukerBehandlingstid={behandlingstid ? behandlingstid.uker : undefined}
                        />
                    </div>
                </Box>
                <Box>
                    <HvaSkjer />
                </Box>
            </VStack>
        </DefaultPage>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
