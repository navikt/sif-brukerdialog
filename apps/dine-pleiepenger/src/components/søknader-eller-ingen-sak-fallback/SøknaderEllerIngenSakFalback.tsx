import { Box, VStack } from '@navikt/ds-react';
import axios from 'axios';
import useSWR from 'swr';

import { useInnsynsdataContext } from '../../hooks/useInnsynsdataContext';
import { useAppIntl } from '../../i18n';
import { innsendteSøknaderSchema, InnsendtSøknad } from '../../types/client-schemas/innsendtSøknadClientSchema';
import { browserEnv } from '../../utils/env';
import { swrBaseConfig } from '../../utils/swrBaseConfig';
import DineInnsendteSøknader from '../dine-innsendte-søknader/DineInnsendteSøknader';
import HvaSkjer from '../hva-skjer/HvaSkjer';
import IngenSakEllerSøknadPage from '../ingen-sak-eller-søknad-page/IngenSakEllerSøknadPage';
import OppdatereSakLenker from '../oppdatere-sak-lenker/OppdatereSakLenker';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageLoading from '../page-layout/page-loading/PageLoading';
import SaksbehandlingstidPanel from '../saksbehandlingstid/Saksbehandlingstid';
import SkrivTilOssLenker from '../skriv-til-oss-lenker/SkrivTilOssLenker';

const SøknaderEllerIngenSakFalback = () => {
    const { text } = useAppIntl();
    const {
        innsynsdata: { søker },
    } = useInnsynsdataContext();

    // Bruker fødselsnummer i cache-nøkkel for å sikre at ulike brukere får separate cache-entries.
    // Dette er en ekstrasikkerhet da vi alltid sjekker om innlogget bruker er den samme når vinduet får fokus.
    const {
        data: innsendteSøknader,
        isLoading,
        error,
    } = useSWR<InnsendtSøknad[]>(
        [`${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknader`, søker.fødselsnummer],
        ([url]) => axios.get(url).then((res) => innsendteSøknaderSchema.parse(res.data)),
        swrBaseConfig,
    );

    if (isLoading) {
        return <PageLoading />;
    }

    if (error || !innsendteSøknader || innsendteSøknader.length === 0) {
        return <IngenSakEllerSøknadPage />;
    }

    return (
        <DefaultPageLayout documentTitle={text('forside.dokumentTittel')}>
            <VStack gap="8">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <DineInnsendteSøknader søknader={innsendteSøknader} />
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <SaksbehandlingstidPanel />
                    </div>
                </Box>
                <Box>
                    <OppdatereSakLenker />
                </Box>
                <Box>
                    <SkrivTilOssLenker />
                </Box>
                <Box className="mt-4">
                    <HvaSkjer />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default SøknaderEllerIngenSakFalback;
