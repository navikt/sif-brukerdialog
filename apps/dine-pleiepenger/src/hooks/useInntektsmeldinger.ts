import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';

import { Inntektsmeldinger } from '../types/Inntektsmelding';
import { browserEnv } from '../utils/env';
import { useInnsynsdataContext } from './useInnsynsdataContext';

interface UseInntektsmeldingerOptions {
    saksnummer: string;
    /**
     * Inntektsmeldinger som allerede er hentet (f.eks. fra server-side props).
     * Hvis dette er satt, vil hook ikke gjøre fetch.
     */
    inntektsmeldingerProp?: Inntektsmeldinger;
}

/**
 * Hook for å hente inntektsmeldinger for en sak.
 * Håndterer caching i context og fetching med SWR.
 */
export const useInntektsmeldinger = ({ saksnummer, inntektsmeldingerProp }: UseInntektsmeldingerOptions) => {
    const { getInntektsmeldinger, setInntektsmeldinger } = useInnsynsdataContext();
    const cachedInntektsmeldinger = getInntektsmeldinger(saksnummer);

    const shouldFetch = !inntektsmeldingerProp && !cachedInntektsmeldinger;

    const {
        data: inntektsmeldingerFetched,
        error,
        isLoading,
    } = useSWR<Inntektsmeldinger, AxiosError>(
        shouldFetch ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnummer}/inntektsmeldinger` : null,
        (url) => axios.get(url, { transformResponse: storageParser }).then((res) => res.data),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            errorRetryCount: 0,
        },
    );

    const inntektsmeldinger = inntektsmeldingerProp || cachedInntektsmeldinger || inntektsmeldingerFetched;

    // Lagre i context når data er hentet
    useEffect(() => {
        if (inntektsmeldinger && !cachedInntektsmeldinger) {
            setInntektsmeldinger(saksnummer, inntektsmeldinger);
        }
    }, [inntektsmeldinger, cachedInntektsmeldinger, setInntektsmeldinger, saksnummer]);

    return {
        inntektsmeldinger,
        isLoading: shouldFetch && isLoading,
        error: shouldFetch ? error : undefined,
    };
};
