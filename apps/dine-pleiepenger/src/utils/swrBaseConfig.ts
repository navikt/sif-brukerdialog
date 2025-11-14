import { SWRConfiguration } from 'swr';

export const swrBaseConfig: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 1,
    dedupingInterval: 300000, // Cache i 5 minutter
};
