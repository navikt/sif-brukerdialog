export const queryKeys = {
    SlettDeltaker: (deltakelseId?: string) => ['SlettDeltaker', deltakelseId] as const,
    deltakerById: (deltakerId?: string) => ['deltakerById', deltakerId] as const,
    deltakelserForDeltaker: (deltakerId?: string) => ['deltakelserForDeltaker', deltakerId] as const,
    finnDeltaker: (deltakerIdent?: string) => ['finnDeltaker', deltakerIdent] as const,
    deltakelseHistorikk: (deltakelseId?: string) => ['deltakelseHistorikk', deltakelseId] as const,
};

export const queries = {
    deltakelserForDeltaker: (deltakerId: string) => ({
        queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
    }),
    deltakelseHistorikk: (deltakelseId: string) => ({
        queryKey: queryKeys.deltakelseHistorikk(deltakelseId),
    }),
    finnDeltaker: (deltakerIdent: string) => ({
        queryKey: queryKeys.finnDeltaker(deltakerIdent),
    }),
};
