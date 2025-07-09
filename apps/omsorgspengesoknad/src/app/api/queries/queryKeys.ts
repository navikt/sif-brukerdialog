export const queryKeys = {
    søknadInitialData: () => ['søknadInitialData'] as const,
    innvilgetVedtak: (pleietrengendeAktørId) => ['innvilgetVedtak', pleietrengendeAktørId] as const,
};

export const queries = {
    innvilgetVedtak: (pleietrengendeAktørId: string) => ({
        queryKey: queryKeys.innvilgetVedtak(pleietrengendeAktørId),
    }),
};
