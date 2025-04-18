export const queryKeys = {
    deltakerById: (deltakerId?: string) => ['deltakerById', deltakerId] as const,
    deltakelserForDeltaker: (deltakerId?: string) => ['deltakelserForDeltaker', deltakerId] as const,
};

export const queries = {
    // deltakelser: () => ['deltakelser'] as const,
    // deltakelseById: (deltakelseId?: string) => ['deltakelseById', deltakelseId] as const,
    deltakelserForDeltaker: (deltakerId: string) => ({
        queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
    }),
};
