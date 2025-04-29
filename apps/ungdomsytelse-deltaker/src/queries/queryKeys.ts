export const queryKeys = {
    barn: ['barn'],
    søker: ['søker'],
    kontonummer: ['kontonummer'],
    deltakelser: ['alleMineDeltakelser'],
    deltakelserForDeltaker: (deltakerId: string) => ['deltakelserForDeltaker', deltakerId],
};

export const queries = {
    barn: { queryKey: queryKeys.barn },
    søker: { queryKey: queryKeys.søker },
    alleMineDeltakelser: { queryKey: queryKeys.deltakelser },
    deltakelserForDeltaker: (deltakerId: string) => ({
        queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
    }),
    kontonummer: () => ({
        queryKey: queryKeys.kontonummer,
    }),
};
