import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineMellomlagringer from '../components/dine-mellomlagringer/DineMellomlagringer';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import DefaultPage from '../components/layout/default-page/DefaultPage';
import Snarveier from '../components/snarveier/Snarveier';
import Svarfrist from '../components/svarfrist/Svarfrist';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { mellomlagring, søknader, svarfrist },
    } = useInnsynsdataContext();

    return (
        <DefaultPage>
            <Head>
                <title>Dine pleiepenger</title>
            </Head>
            <VStack gap="12">
                <DineMellomlagringer søknad={mellomlagring.søknad} endring={mellomlagring.endring} />

                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineSøknader søknader={søknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Svarfrist frist={svarfrist} />
                    </div>
                </Box>

                <Box className="mb-5">
                    <Snarveier />
                </Box>
            </VStack>
        </DefaultPage>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
