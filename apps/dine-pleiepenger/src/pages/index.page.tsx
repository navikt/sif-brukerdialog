import { ReactElement } from 'react';
import axios from 'axios';
import { withAuthenticatedPage } from '../auth/withAuthentication';
import VelgSakPage from '../components/velg-sak-page/VelgSakPage';
import { useInnsynsdataContext } from '../hooks/useInnsynsdataContext';
import { useLogBrukerprofil } from '../hooks/useLogBrukerprofil';
import { useVerifyUserOnWindowFocus } from '../hooks/useVerifyUserOnWindowFocus';
import { Søker } from '../server/api-models/SøkerSchema';
import { browserEnv } from '../utils/env';
import SakPage from './sak/SakPage';
import IngenSakFallback from '../components/ingen-sak-fallback/IngenSakFallback';

const søkerIdFetcher = async (): Promise<string> => {
    const url = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soker`;
    return axios.get<Søker>(url).then((res) => res.data.fødselsnummer);
};

function DinePleiepengerPage(): ReactElement {
    const {
        innsynsdata: { saker, brukerprofil, søker },
    } = useInnsynsdataContext();

    useLogBrukerprofil(brukerprofil);
    useVerifyUserOnWindowFocus(søker.fødselsnummer, søkerIdFetcher);

    if (saker.length === 1) {
        return <SakPage sak={saker[0].sak} antallSaker={1} pleietrengende={saker[0].pleietrengende} />;
    }

    if (saker.length > 1) {
        return <VelgSakPage saker={saker} />;
    }

    return <IngenSakFallback />;
    // }

    // return (
    //     <DefaultPageLayout documentTitle={text('forside.dokumentTittel')}>
    //         <VStack gap="8">
    //             <Box className="md:flex md:gap-6">
    //                 <div className="md:grow mb-10 md:mb-0">
    //                     <DineInnsendteSøknader søknader={innsendteSøknader} />
    //                 </div>
    //                 <div className="md:mb-none shrink-0 md:w-72">
    //                     <Saksbehandlingstid frist={getSaksbehandlingsfrist(innsendteSøknader, saker)} />
    //                 </div>
    //             </Box>
    //             <Box>
    //                 <OppdatereSakLenker />
    //             </Box>
    //             <Box>
    //                 <SkrivTilOssLenker />
    //             </Box>
    //             <Box className="mt-4">
    //                 <HvaSkjer />
    //             </Box>
    //         </VStack>
    //     </DefaultPageLayout>
    // );
}

export const getServerSideProps = withAuthenticatedPage();

export default DinePleiepengerPage;
