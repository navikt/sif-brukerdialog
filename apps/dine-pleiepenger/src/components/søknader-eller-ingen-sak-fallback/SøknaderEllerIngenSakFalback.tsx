'use client';

import { Box, Skeleton, VStack } from '@navikt/ds-react';
import axios from 'axios';
import useSWR from 'swr';
import IngenSakEllerSøknadPage from '../ingen-sak-eller-søknad-page/IngenSakEllerSøknadPage';
import { useAppIntl } from '../../i18n';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import DineInnsendteSøknader from '../dine-innsendte-søknader/DineInnsendteSøknader';
import OppdatereSakLenker from '../oppdatere-sak-lenker/OppdatereSakLenker';
import SkrivTilOssLenker from '../skriv-til-oss-lenker/SkrivTilOssLenker';
import HvaSkjer from '../hva-skjer/HvaSkjer';
import { InnsendtSøknad } from '../../types/InnsendtSøknad';
import { browserEnv } from '../../utils/env';
import Saksbehandlingstid from '../saksbehandlingstid/Saksbehandlingstid';
import { InnsendtSøknaderSchema } from '../../server/api-models/InnsendtSøknadSchema';

const søknaderFetcher = async (url: string): Promise<InnsendtSøknad[]> =>
    axios.get(url).then((res) => InnsendtSøknaderSchema.parse(res.data));

const SøknaderEllerIngenSakFalback = () => {
    const { text } = useAppIntl();

    const {
        data: innsendteSøknader,
        isLoading,
        error,
    } = useSWR<InnsendtSøknad[]>(`${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/soknader`, søknaderFetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });

    if (error) {
        return <IngenSakEllerSøknadPage />;
    }

    if (!isLoading && (!innsendteSøknader || innsendteSøknader.length === 0)) {
        return <IngenSakEllerSøknadPage />;
    }

    return (
        <DefaultPageLayout documentTitle={text('forside.dokumentTittel')}>
            <VStack gap="8">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        {isLoading ? (
                            <Skeleton height="200px" variant="rounded" />
                        ) : (
                            <DineInnsendteSøknader søknader={innsendteSøknader || []} />
                        )}
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <Saksbehandlingstid />
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
