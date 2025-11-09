import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { PleietrengendeMedSak, PleietrengendeMedSakSchema } from '../server/api-models/PleietrengendeMedSakSchema';
import { browserEnv } from '../utils/env';
import { useInnsynsdataContext } from './useInnsynsdataContext';

const sakFetcher = async (url: string): Promise<PleietrengendeMedSak> => {
    const response = await axios.get(url);
    // Parse med Zod for å konvertere date strings til Date objekter
    return PleietrengendeMedSakSchema.parse(response.data);
};

/**
 * Tilpasset hook for å hente sak fra route med lazy loading
 */
export const usePleietrengendeMedSakFromRoute = (): {
    pleietrengendeMedSak: PleietrengendeMedSak | undefined;
    saksnr: string | undefined;
    isLoading: boolean;
    error: Error | undefined;
} => {
    const { getSaksdata, setSaksdata } = useInnsynsdataContext();
    const router = useRouter();
    const { saksnr } = router.query;
    const saksnrString = typeof saksnr === 'string' ? saksnr : undefined;

    const [cachedSak, setCachedSak] = useState<PleietrengendeMedSak | undefined>(
        saksnrString ? getSaksdata(saksnrString) : undefined,
    );

    // Only fetch if we have a saksnr and no cached data
    const shouldFetch = saksnrString && !cachedSak;
    const { data, error, isLoading } = useSWR<PleietrengendeMedSak>(
        shouldFetch ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnrString}` : null,
        sakFetcher,
    );

    // Update cache when data is fetched
    useEffect(() => {
        if (data && saksnrString) {
            setSaksdata(saksnrString, data);
            setCachedSak(data);
        }
    }, [data, saksnrString, setSaksdata]);

    // Check cache again if saksnr changes
    useEffect(() => {
        if (saksnrString) {
            const cached = getSaksdata(saksnrString);
            if (cached) {
                setCachedSak(cached);
            }
        }
    }, [saksnrString, getSaksdata]);

    return {
        pleietrengendeMedSak: cachedSak || data,
        saksnr: saksnrString,
        isLoading,
        error,
    };
};
