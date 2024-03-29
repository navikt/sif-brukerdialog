import { Box, VStack } from '@navikt/ds-react';
import { ReactElement } from 'react';
import Head from 'next/head';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import DineSøknader from '../components/dine-søknader/DineSøknader';
import HvaSkjer from '../components/hva-skjer/HvaSkjer';
import DefaultPage from '../components/page-layout/default-page/DefaultPage';
import Snarveier from '../components/snarveier/Snarveier';
import Svarfrist from '../components/svarfrist/Svarfrist';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useLogBrukerprofil } from '../hooks/useLogBrukerprofil';
import { Sak } from '../server/api-models/SakSchema';
import { Søknad, Søknadstype } from '../types/Søknad';

const harSendtInnSøknadEllerEndringsmelding = (søknader: Søknad[]): boolean => {
    return søknader.some(
        (søknad) =>
            søknad.søknadstype === Søknadstype.PP_SYKT_BARN ||
            søknad.søknadstype === Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING,
    );
};

const getSaksbehandlingsfrist = (søknader: Søknad[], saker: Sak[]): Date | undefined => {
    if (saker.length === 1 && harSendtInnSøknadEllerEndringsmelding(søknader)) {
        return saker[0].sak.saksbehandlingsFrist;
    }
    return undefined;
};

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { søknader, saker, saksbehandlingstidUker },
    } = useInnsynsdataContext();

    useLogBrukerprofil(søknader, saker, saksbehandlingstidUker);

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
                            frist={getSaksbehandlingsfrist(søknader, saker)}
                            saksbehandlingstidUker={saksbehandlingstidUker}
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
