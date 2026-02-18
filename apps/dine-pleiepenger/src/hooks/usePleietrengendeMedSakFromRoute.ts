import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { PleietrengendeMedSak, SakMedInntektsmeldinger } from '../types';
import { sakMedInntektsmeldingerClientSchema } from '../types/client-schemas/sakMedInntektsmeldingerClientSchema';
import appSentryLogger from '../utils/appSentryLogger';
import { browserEnv } from '../utils/env';
import { sortBehandlingerNyesteFørst } from '../utils/sakUtils';
import { swrBaseConfig } from '../utils/swrBaseConfig';
import { useInnsynsdataContext } from './useInnsynsdataContext';

const sakFetcher = async (url: string): Promise<SakMedInntektsmeldinger> => {
    const response = await axios.get(url);
    try {
        const parsedData = sakMedInntektsmeldingerClientSchema.parse(response.data);
        parsedData.sak.behandlinger = sortBehandlingerNyesteFørst(parsedData.sak.behandlinger);
        return parsedData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Feil ved parsing av SakMedInntektsmeldinger:', error);
        throw error;
    }
};

/** Henter sak fra route med lazy loading */
export const usePleietrengendeMedSakFromRoute = (): {
    pleietrengendeMedSak: PleietrengendeMedSak | undefined;
    saksnr: string | undefined;
    isLoading: boolean;
    error: Error | undefined;
} => {
    const {
        getSaksdata,
        setSaksdata,
        innsynsdata: { sakerMetadata, søker },
    } = useInnsynsdataContext();
    const router = useRouter();
    const saksnr = typeof router.query.saksnr === 'string' ? router.query.saksnr : undefined;

    // Sjekk cache
    const cachedSak = saksnr ? getSaksdata(saksnr) : undefined;

    // Fetch hvis ikke cached. Bruker fødselsnummer i cache-nøkkel for å sikre at ulike brukere får separate cache-entries.
    // Dette er en ekstrasikkerhet da vi alltid sjekker om innlogget bruker er den samme når vinduet får fokus.
    const {
        data: sakData,
        error,
        isLoading,
    } = useSWR<SakMedInntektsmeldinger>(
        saksnr && !cachedSak ? [`${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnr}`, søker.fødselsnummer] : null,
        ([url]) => sakFetcher(url),
        swrBaseConfig,
    );

    // Kombiner synkront
    const pleietrengendeMedSak = useMemo(() => {
        if (cachedSak) return cachedSak;
        if (!sakData || !saksnr) return undefined;

        const metadata = sakerMetadata.find((m) => m.saksnummer === saksnr);
        if (!metadata?.pleietrengende) return undefined;

        try {
            return { pleietrengende: metadata.pleietrengende, ...sakData };
        } catch {
            return undefined;
        }
    }, [cachedSak, sakData, saksnr, sakerMetadata]);

    // Lagre i cache (side-effect)
    useEffect(() => {
        if (pleietrengendeMedSak && saksnr && !cachedSak) {
            setSaksdata(saksnr, pleietrengendeMedSak);
        }
    }, [pleietrengendeMedSak, saksnr, cachedSak, setSaksdata]);

    // Logg feil til Sentry
    useEffect(() => {
        if (error) {
            appSentryLogger.logError(
                'usePleietrengendeMedSakFromRoute-failed',
                JSON.stringify({ error: error.message }),
            );
        }
    }, [error]);

    return {
        pleietrengendeMedSak,
        saksnr,
        isLoading: !cachedSak && isLoading,
        error,
    };
};
