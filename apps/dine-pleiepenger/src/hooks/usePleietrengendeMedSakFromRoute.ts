import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { PleietrengendeSchema } from '../server/api-models/PleietrengendeSchema';
import {
    SakMedInntektsmeldinger,
    SakMedInntektsmeldingerSchema,
} from '../server/api-models/SakMedInntektsmeldingerSchema';
import { browserEnv } from '../utils/env';
import { useInnsynsdataContext } from './useInnsynsdataContext';

const sakFetcher = async (url: string): Promise<SakMedInntektsmeldinger> => {
    const response = await axios.get(url);
    return SakMedInntektsmeldingerSchema.parse(response.data);
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
        innsynsdata: { sakerMetadata },
    } = useInnsynsdataContext();
    const router = useRouter();
    const saksnr = typeof router.query.saksnr === 'string' ? router.query.saksnr : undefined;

    // Sjekk cache
    const cachedSak = saksnr ? getSaksdata(saksnr) : undefined;

    // Fetch hvis ikke cached
    const {
        data: sakData,
        error,
        isLoading,
    } = useSWR<SakMedInntektsmeldinger>(
        saksnr && !cachedSak ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnr}` : null,
        sakFetcher,
    );

    // Kombiner synkront
    const pleietrengendeMedSak = useMemo(() => {
        if (cachedSak) return cachedSak;
        if (!sakData || !saksnr) return undefined;

        const metadata = sakerMetadata.find((m) => m.saksnummer === saksnr);
        if (!metadata?.pleietrengende) return undefined;

        try {
            const pleietrengende = PleietrengendeSchema.parse(metadata.pleietrengende);
            return { pleietrengende, ...sakData };
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

    return {
        pleietrengendeMedSak,
        saksnr,
        isLoading: !cachedSak && isLoading,
        error,
    };
};
