import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    // Konverterer date strings til Date objekter
    return SakMedInntektsmeldingerSchema.parse(response.data);
};

/** Henter sak fra route med lazy loading */
export const usePleietrengendeMedSakFromRoute = (): {
    pleietrengendeMedSak: PleietrengendeMedSak | undefined;
    saksnr: string | undefined;
    isLoading: boolean;
    error: Error | undefined;
} => {
    const { getSaksdata, setSaksdata, innsynsdata } = useInnsynsdataContext();
    const router = useRouter();
    const { saksnr } = router.query;
    const saksnrString = typeof saksnr === 'string' ? saksnr : undefined;

    const [cachedSak, setCachedSak] = useState<PleietrengendeMedSak | undefined>(
        saksnrString ? getSaksdata(saksnrString) : undefined,
    );

    // Hent kun hvis vi har saksnr og ingen cached data
    const shouldFetch = saksnrString && !cachedSak;
    const { data, error, isLoading } = useSWR<SakMedInntektsmeldinger>(
        shouldFetch ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnrString}` : null,
        sakFetcher,
    );

    // Venter på router query eller på fetch
    const isActuallyLoading = !router.isReady || isLoading;

    // Kombiner hentet data med pleietrengende fra metadata
    useEffect(() => {
        if (data && saksnrString) {
            const metadata = innsynsdata.sakerMetadata.find((m) => m.saksnummer === saksnrString);
            if (metadata?.pleietrengende) {
                const pleietrengende = PleietrengendeSchema.parse(metadata.pleietrengende);
                const completeSak: PleietrengendeMedSak = {
                    pleietrengende,
                    ...data,
                };
                setSaksdata(saksnrString, completeSak);
                setCachedSak(completeSak);
            }
        }
    }, [data, saksnrString, setSaksdata, innsynsdata.sakerMetadata]);

    // Sjekk cache på nytt hvis saksnr endres
    useEffect(() => {
        if (saksnrString) {
            const cached = getSaksdata(saksnrString);
            if (cached) {
                setCachedSak(cached);
            }
        }
    }, [saksnrString, getSaksdata]);

    return {
        pleietrengendeMedSak: cachedSak,
        saksnr: saksnrString,
        isLoading: isActuallyLoading,
        error,
    };
};
