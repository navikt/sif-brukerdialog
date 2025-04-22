export const queryKeys = {
    deltakerById: (deltakerId?: string) => ['deltakerById', deltakerId] as const,
    deltakelserForDeltaker: (deltakerId?: string) => ['deltakelserForDeltaker', deltakerId] as const,
    finnDeltaker: (deltakerIdent?: string) => ['finnDeltaker', deltakerIdent] as const,
};

export const queries = {
    deltakelserForDeltaker: (deltakerId: string) => ({
        queryKey: queryKeys.deltakelserForDeltaker(deltakerId),
    }),
    finnDeltaker: (deltakerIdent: string) => ({
        queryKey: queryKeys.finnDeltaker(deltakerIdent),
    }),
};
